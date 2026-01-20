import { useTranslation } from 'react-i18next';
import { UsersTab } from './tabs/UsersTab';
import ListingsTab from './tabs/ListingsTab';
import { useState } from 'react';

export const ADMIN_BOARD_TABS = ['USERS', 'LISTINGS'] as const;
type AdminTab = typeof ADMIN_BOARD_TABS[number];

export function AdminBoard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AdminTab>('USERS');


  return (
    <div className="admin-board flex flex-col md:flex-row flex-1 content-stretch">
      <div className='admin-board__sidebar w-2xs border-r-1 border-neutral'>
          <h1 className='text-xl pl-4'>{t('admin.dashboard')}</h1>
          <ul className="flex flex-col pt-4">
            <li><button className='border-t-1 border-neutral' onClick={()=>{setActiveTab('USERS')}} >{t('admin.users_tab')}</button></li>
            <li><button onClick={()=>{setActiveTab('LISTINGS')}} >{t('admin.listings_tab')}</button></li>
          </ul>
          </div>
      <div className='admin-board__main flex-1'>
        {activeTab === 'USERS' && <UsersTab />}
        {activeTab === 'LISTINGS' && <ListingsTab />}
      </div>
    </div>
  );
}
