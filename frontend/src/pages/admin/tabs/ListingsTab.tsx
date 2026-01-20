import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LISTING_STATUSES,
  type Listing,
  type ListingSearchRequest,
  type ListingStatus,
} from "../../../types/listing";
import { apiSearchListings } from "../../../api/listing";

type ListingStatusFilter = ListingStatus | "ALL";

function formatPrice(value: number) {
  return `€${Number(value).toFixed(2)}`;
}

function StatusPill({ status }: { status: ListingStatus }) {
  const cls =
    status === "ACTIVE"
      ? "badge-success"
      : status === "DRAFT"
        ? "badge-warning"
        : "badge-neutral";

  return <span className={`badge ${cls}`}>{status}</span>;
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-base-content truncate">
              {listing.title}
            </h3>
            <p className="text-sm text-[var(--color-muted)]">
              {listing.city}
              {listing.addressLine ? ` • ${listing.addressLine}` : ""}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <StatusPill status={listing.status} />
            <div className="text-sm font-medium text-base-content">
              {formatPrice(listing.nightPrice)}
              <span className="text-[var(--color-muted)] font-normal"> / night</span>
            </div>
          </div>
        </div>

        {listing.description ? (
          <p className="text-sm text-base-content/80 line-clamp-2 mt-2">
            {listing.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function ListingsTab() {
  const { t } = useTranslation();

  const [cityQuery, setCityQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ListingStatusFilter>("ALL");

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [items, setItems] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request: ListingSearchRequest = useMemo(
    () => ({
      query: cityQuery,
      status: statusFilter === "ALL" ? null : statusFilter,
      page,
      size,
    }),
    [cityQuery, statusFilter, page, size]
  );

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await apiSearchListings(request);
        setItems(res.data.content);
        setTotalPages(res.data.meta.totalPages);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load listings");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [request]);

  return (
    <div className="admin-board__listings flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-base-content">
          {t("admin.listings_title", { defaultValue: "Listings" })}
        </h2>
        <p className="text-sm text-[var(--color-muted)]">
          {t("admin.listings_subtitle", {
            defaultValue: "Search and manage listings.",
          })}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <label className="flex-1">
          <span className="block text-xs font-medium text-[var(--color-muted)] mb-1">
            {t("admin.city", { defaultValue: "City" })}
          </span>
          <input
            type="search"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setPage(0);
            }}
            placeholder={t("admin.city_search_placeholder", {
              defaultValue: "Search by city...",
            })}
            className="input input-bordered w-full"
          />
        </label>

        <label className="w-full md:w-64">
          <span className="block text-xs font-medium text-[var(--color-muted)] mb-1">
            {t("admin.status", { defaultValue: "Status" })}
          </span>
          <select
            className="select select-bordered w-full"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ListingStatusFilter);
              setPage(0);
            }}
          >
            <option value="ALL">{t("common.all", { defaultValue: "All" })}</option>
            {LISTING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-[var(--color-muted)]">
          {t("common.loading", { defaultValue: "Loading..." })}
        </div>
      ) : null}

      {/* Cards */}
      {items.length === 0 && !loading ? (
        <div className="text-sm text-[var(--color-muted)]">
          {t("admin.no_results", { defaultValue: "No listings found." })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {items.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          className="btn btn-sm"
          disabled={loading || page <= 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          {t("common.prev", { defaultValue: "Prev" })}
        </button>

        <div className="text-sm text-[var(--color-muted)]">
          {t("common.page", { defaultValue: "Page" })}{" "}
          <span className="text-base-content font-medium">{page + 1}</span>
          {totalPages > 0 ? (
            <>
              {" "}
              {t("common.of", { defaultValue: "of" })}{" "}
              <span className="text-base-content font-medium">{totalPages}</span>
            </>
          ) : null}
        </div>

        <button
          className="btn btn-sm"
          disabled={loading || totalPages === 0 || page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          {t("common.next", { defaultValue: "Next" })}
        </button>
      </div>
    </div>
  );
}
