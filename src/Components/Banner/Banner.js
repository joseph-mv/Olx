import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import './Banner.css';
import Arrow from '../../assets/Arrow';

function Banner() {
  const { t } = useTranslation();
  const [isSubMenu, setIsSubMenu] = useState(false);

  return (
    <div className='bannerContainer'>
      <div className="bannerParentDiv">
        <div className="bannerChildDiv">
          <div className="menuBar">
            <div onClick={() => setIsSubMenu(!isSubMenu)} className="categoryMenu">
              <span>{t('ALL_CATEGORIES')}</span>
              <div className={isSubMenu ? 'arrow' : ''}>
                <Arrow />
              </div>
            </div>
            <div className="otherQuickOptions">
              <span>{t('CARS')}</span>
              <span>{t('MOTORCYCLES')}</span>
              <span>{t('MOBILE_PHONES')}</span>
              <span>{t('FOR_SALE_HOUSES_APARTMENTS')}</span>
              <span>{t('SCOOTERS')}</span>
              <span>{t('COMMERCIAL_OTHER_VEHICLES')}</span>
              <span>{t('FOR_RENT_HOUSES_APARTMENTS')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('subMenu', { 'subMenu--visible': isSubMenu })}>
        <div className="container">
          <div className="column column-1">
            <ul>
              <li><span>{t('CARS')}</span></li>
              <li><span>{t('PROPERTIES')}</span></li>
              <li>{t('FOR_SALE_HOUSES_APARTMENTS')}</li>
              <li>{t('FOR_RENT_HOUSES_APARTMENTS')}</li>
              <li>{t('LANDS_PLOTS')}</li>
              <li>{t('FOR_RENT_SHOPS_OFFICES')}</li>
              <li>{t('FOR_SALE_SHOPS_OFFICES')}</li>
              <li>{t('PG_GUEST_HOUSES')}</li>
              <li><span>{t('MOBILES')}</span></li>
              <li>{t('MOBILE_PHONES')}</li>
              <li>{t('ACCESSORIES')}</li>
              <li>{t('TABLETS')}</li>
            </ul>
          </div>
          <div className="column column-2">
            <ul>
              <li><span>{t('JOBS')}</span></li>
              <li>{t('DATA_ENTRY_BACK_OFFICE')}</li>
              <li>{t('SALES_MARKETING')}</li>
              <li>{t('BPO_TELECALLER')}</li>
              <li>{t('DRIVER')}</li>
              <li>{t('OFFICE_ASSISTANT')}</li>
              <li>{t('DELIVERY_COLLECTION')}</li>
              <li>{t('TEACHER')}</li>
              <li>{t('COOK')}</li>
              <li>{t('RECEPTIONIST_FRONT_OFFICE')}</li>
              <li>{t('OPERATOR_TECHNICIAN')}</li>
              <li>{t('IT_ENGINEER_DEVELOPER')}</li>
              <li>{t('HOTEL_TRAVEL_EXECUTIVE')}</li>
              <li>{t('ACCOUNTANT')}</li>
              <li>{t('DESIGNER')}</li>
              <li>{t('OTHER_JOBS')}</li>
              <li><span>{t('BIKES')}</span></li>
              <li>{t('MOTORCYCLES')}</li>
              <li>{t('SCOOTERS')}</li>
              <li>{t('SPARE_PARTS')}</li>
              <li>{t('BICYCLES')}</li>
            </ul>
          </div>
          <div className="column column-3">
            <ul>
              <li><span>{t('ELECTRONICS_APPLIANCES')}</span></li>
              <li>{t('TVS_VIDEO_AUDIO')}</li>
              <li>{t('KITCHEN_OTHER_APPLIANCES')}</li>
              <li>{t('COMPUTERS_LAPTOPS')}</li>
              <li>{t('CAMERAS_LENSES')}</li>
              <li>{t('GAMES_ENTERTAINMENT')}</li>
              <li>{t('FRIDGES')}</li>
              <li>{t('COMPUTER_ACCESSORIES')}</li>
              <li>{t('HARD_DISKS_PRINTERS_MONITORS')}</li>
              <li>{t('ACS')}</li>
              <li>{t('WASHING_MACHINES')}</li>
              <li><span>{t('COMMERCIAL_VEHICLES_SPARES')}</span></li>
              <li>{t('COMMERCIAL_OTHER_VEHICLES')}</li>
              <li>{t('SPARE_PARTS')}</li>
              <li><span>{t('FURNITURE')}</span></li>
              <li>{t('SOFA_DINING')}</li>
              <li>{t('BEDS_WARDROBES')}</li>
              <li>{t('HOME_DECOR_GARDEN')}</li>
              <li>{t('KIDS_FURNITURE')}</li>
              <li>{t('OTHER_HOUSEHOLD_ITEMS')}</li>
              <li><span>{t('FASHION')}</span></li>
              <li>{t('MEN')}</li>
              <li>{t('WOMEN')}</li>
              <li>{t('KIDS')}</li>
            </ul>
          </div>
          <div className="column column-4">
            <ul>
              <li><span>{t('BOOKS_SPORTS_HOBBIES')}</span></li>
              <li>{t('BOOKS')}</li>
              <li>{t('GYM_FITNESS')}</li>
              <li>{t('MUSICAL_INSTRUMENTS')}</li>
              <li>{t('SPORTS_EQUIPMENT')}</li>
              <li>{t('OTHER_HOBBIES')}</li>
              <li><span>{t('PETS')}</span></li>
              <li>{t('FISHES_AQUARIUM')}</li>
              <li>{t('PET_FOOD_ACCESSORIES')}</li>
              <li>{t('DOGS')}</li>
              <li>{t('OTHER_PETS')}</li>
              <li><span>{t('SERVICES')}</span></li>
              <li>{t('EDUCATION_CLASSES')}</li>
              <li>{t('TOURS_TRAVEL')}</li>
              <li>{t('ELECTRONICS_REPAIR_SERVICES')}</li>
              <li>{t('HEALTH_BEAUTY')}</li>
              <li>{t('HOME_RENOVATION_REPAIR')}</li>
              <li>{t('CLEANING_PEST_CONTROL')}</li>
              <li>{t('LEGAL_DOCUMENTATION_SERVICES')}</li>
              <li>{t('PACKERS_MOVERS')}</li>
              <li>{t('OTHER_SERVICES')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
