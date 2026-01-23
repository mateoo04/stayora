import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LISTING_STATUSES,
  type Listing,
  type ListingSearchRequest,
  type ListingStatus,
} from "../../../types/listing";
import { apiSearchListings } from "../../../api/listing";
import { apiUpdateListingStatus } from "../../../api/admin";

type ListingStatusFilter = ListingStatus | "ALL";

function formatPrice(value: number) {
  return `€${Number(value).toFixed(2)}`;
}

function ListingCard({ listing, onClick }: { listing: Listing, onClick: (id: number, status: ListingStatus) => void }) {
  const { t } = useTranslation();

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

            <div className="text-sm font-medium text-base-content">
              {formatPrice(listing.nightPrice)}
              <span className="text-[var(--color-muted)] font-normal"> / night</span>
            </div>
          </div>

        {listing.description ? (
          <p className="text-sm text-base-content/80 line-clamp-2 mt-2">
            {listing.description}
          </p>
        ) : null}
      </div>
      <div className="card-footer flex flex-row">
          <div className="px-4 uppercase">
            {listing.status === "ACTIVE" ? t('listing.status.active', { defaultValue: "Active" }) : null}
            {listing.status === "PAUSED" ? t('listing.status.paused', { defaultValue: "Paused" }) : null}
            {listing.status === "DRAFT" ? t('listing.status.draft', { defaultValue: "Draft" }) : null}
          </div>
          <button className="btn btn-sm btn-primary ml-auto min-w-36" onClick={() => onClick(listing.id,
            listing.status === "ACTIVE" ? "PAUSED" :
            listing.status === "PAUSED" ? "ACTIVE" :
            listing.status === "DRAFT" ? "ACTIVE" :
            listing.status
          )}>
            {listing.status === "ACTIVE" ? t('listing.status.pause', { defaultValue: "Pause" }) : null}
            {listing.status === "PAUSED" ? t('listing.status.unpause', { defaultValue: "Unpause" }) : null}
            {listing.status === "DRAFT" ? t('listing.status.approve', { defaultValue: "Approve" }) : null}
          </button>
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


    async function loadData() {
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

  useEffect(() => {

    loadData();
  }, [request]);

  async function updateListingStatus(id: number, status: ListingStatus) {
    await apiUpdateListingStatus(id, status);
    loadData();
  }

  return (
    <div className="admin-board__listings flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end">
        <label className="flex-1">
          <input
            type="search"
            name="city"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setPage(0);
            }}
            placeholder={t("admin.city_search_placeholder", {
              defaultValue: "Search by city...",
            })}
            className="input input-bordered w-full max-w-none"
          />
        </label>

        <label className="w-full md:w-64">
          <select
            className="select select-bordered w-full dropdown-btn"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ListingStatusFilter);
              setPage(0);
            }}
          >
            <option value="ALL">{t("admin.listings.any_status", { defaultValue: "All" })}</option>
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
        <div className="grid grid-cols-1">
          {items.map((l) => (
            <ListingCard key={l.id} listing={l} onClick={updateListingStatus} />
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
