import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all locale files
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enDashboard from './locales/en/dashboard.json';
import enAccounts from './locales/en/accounts.json';
import enContacts from './locales/en/contacts.json';
import enLeads from './locales/en/leads.json';
import enOpportunities from './locales/en/opportunities.json';
import enActivities from './locales/en/activities.json';
import enCases from './locales/en/cases.json';
import enUsers from './locales/en/users.json';
import enProducts from './locales/en/products.json';
import enQuotes from './locales/en/quotes.json';
import enSettings from './locales/en/settings.json';
import enAuth from './locales/en/auth.json';
import enProjects from './locales/en/projects.json';

import csCommon from './locales/cs/common.json';
import csNavigation from './locales/cs/navigation.json';
import csDashboard from './locales/cs/dashboard.json';
import csAccounts from './locales/cs/accounts.json';
import csContacts from './locales/cs/contacts.json';
import csLeads from './locales/cs/leads.json';
import csOpportunities from './locales/cs/opportunities.json';
import csActivities from './locales/cs/activities.json';
import csCases from './locales/cs/cases.json';
import csUsers from './locales/cs/users.json';
import csProducts from './locales/cs/products.json';
import csQuotes from './locales/cs/quotes.json';
import csSettings from './locales/cs/settings.json';
import csAuth from './locales/cs/auth.json';
import csProjects from './locales/cs/projects.json';

import ptCommon from './locales/pt/common.json';
import ptNavigation from './locales/pt/navigation.json';
import ptDashboard from './locales/pt/dashboard.json';
import ptAccounts from './locales/pt/accounts.json';
import ptContacts from './locales/pt/contacts.json';
import ptLeads from './locales/pt/leads.json';
import ptOpportunities from './locales/pt/opportunities.json';
import ptActivities from './locales/pt/activities.json';
import ptCases from './locales/pt/cases.json';
import ptUsers from './locales/pt/users.json';
import ptProducts from './locales/pt/products.json';
import ptQuotes from './locales/pt/quotes.json';
import ptSettings from './locales/pt/settings.json';
import ptAuth from './locales/pt/auth.json';
import ptProjects from './locales/pt/projects.json';

import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esDashboard from './locales/es/dashboard.json';
import esAccounts from './locales/es/accounts.json';
import esContacts from './locales/es/contacts.json';
import esLeads from './locales/es/leads.json';
import esOpportunities from './locales/es/opportunities.json';
import esActivities from './locales/es/activities.json';
import esCases from './locales/es/cases.json';
import esUsers from './locales/es/users.json';
import esProducts from './locales/es/products.json';
import esQuotes from './locales/es/quotes.json';
import esSettings from './locales/es/settings.json';
import esAuth from './locales/es/auth.json';
import esProjects from './locales/es/projects.json';

import frCommon from './locales/fr/common.json';
import frNavigation from './locales/fr/navigation.json';
import frDashboard from './locales/fr/dashboard.json';
import frAccounts from './locales/fr/accounts.json';
import frContacts from './locales/fr/contacts.json';
import frLeads from './locales/fr/leads.json';
import frOpportunities from './locales/fr/opportunities.json';
import frActivities from './locales/fr/activities.json';
import frCases from './locales/fr/cases.json';
import frUsers from './locales/fr/users.json';
import frProducts from './locales/fr/products.json';
import frQuotes from './locales/fr/quotes.json';
import frSettings from './locales/fr/settings.json';
import frAuth from './locales/fr/auth.json';
import frProjects from './locales/fr/projects.json';

import deCommon from './locales/de/common.json';
import deNavigation from './locales/de/navigation.json';
import deDashboard from './locales/de/dashboard.json';
import deAccounts from './locales/de/accounts.json';
import deContacts from './locales/de/contacts.json';
import deLeads from './locales/de/leads.json';
import deOpportunities from './locales/de/opportunities.json';
import deActivities from './locales/de/activities.json';
import deCases from './locales/de/cases.json';
import deUsers from './locales/de/users.json';
import deProducts from './locales/de/products.json';
import deQuotes from './locales/de/quotes.json';
import deSettings from './locales/de/settings.json';
import deAuth from './locales/de/auth.json';
import deProjects from './locales/de/projects.json';

import arCommon from './locales/ar/common.json';
import arNavigation from './locales/ar/navigation.json';
import arDashboard from './locales/ar/dashboard.json';
import arAccounts from './locales/ar/accounts.json';
import arContacts from './locales/ar/contacts.json';
import arLeads from './locales/ar/leads.json';
import arOpportunities from './locales/ar/opportunities.json';
import arActivities from './locales/ar/activities.json';
import arCases from './locales/ar/cases.json';
import arUsers from './locales/ar/users.json';
import arProducts from './locales/ar/products.json';
import arQuotes from './locales/ar/quotes.json';
import arSettings from './locales/ar/settings.json';
import arAuth from './locales/ar/auth.json';
import arProjects from './locales/ar/projects.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    dashboard: enDashboard,
    accounts: enAccounts,
    contacts: enContacts,
    leads: enLeads,
    opportunities: enOpportunities,
    activities: enActivities,
    cases: enCases,
    users: enUsers,
    products: enProducts,
    quotes: enQuotes,
    settings: enSettings,
    auth: enAuth,
    projects: enProjects,
  },
  cs: {
    common: csCommon,
    navigation: csNavigation,
    dashboard: csDashboard,
    accounts: csAccounts,
    contacts: csContacts,
    leads: csLeads,
    opportunities: csOpportunities,
    activities: csActivities,
    cases: csCases,
    users: csUsers,
    products: csProducts,
    quotes: csQuotes,
    settings: csSettings,
    auth: csAuth,
    projects: csProjects,
  },
  pt: {
    common: ptCommon,
    navigation: ptNavigation,
    dashboard: ptDashboard,
    accounts: ptAccounts,
    contacts: ptContacts,
    leads: ptLeads,
    opportunities: ptOpportunities,
    activities: ptActivities,
    cases: ptCases,
    users: ptUsers,
    products: ptProducts,
    quotes: ptQuotes,
    settings: ptSettings,
    auth: ptAuth,
    projects: ptProjects,
  },
  es: {
    common: esCommon,
    navigation: esNavigation,
    dashboard: esDashboard,
    accounts: esAccounts,
    contacts: esContacts,
    leads: esLeads,
    opportunities: esOpportunities,
    activities: esActivities,
    cases: esCases,
    users: esUsers,
    products: esProducts,
    quotes: esQuotes,
    settings: esSettings,
    auth: esAuth,
    projects: esProjects,
  },
  fr: {
    common: frCommon,
    navigation: frNavigation,
    dashboard: frDashboard,
    accounts: frAccounts,
    contacts: frContacts,
    leads: frLeads,
    opportunities: frOpportunities,
    activities: frActivities,
    cases: frCases,
    users: frUsers,
    products: frProducts,
    quotes: frQuotes,
    settings: frSettings,
    auth: frAuth,
    projects: frProjects,
  },
  de: {
    common: deCommon,
    navigation: deNavigation,
    dashboard: deDashboard,
    accounts: deAccounts,
    contacts: deContacts,
    leads: deLeads,
    opportunities: deOpportunities,
    activities: deActivities,
    cases: deCases,
    users: deUsers,
    products: deProducts,
    quotes: deQuotes,
    settings: deSettings,
    auth: deAuth,
    projects: deProjects,
  },
  ar: {
    common: arCommon,
    navigation: arNavigation,
    dashboard: arDashboard,
    accounts: arAccounts,
    contacts: arContacts,
    leads: arLeads,
    opportunities: arOpportunities,
    activities: arActivities,
    cases: arCases,
    users: arUsers,
    products: arProducts,
    quotes: arQuotes,
    settings: arSettings,
    auth: arAuth,
    projects: arProjects,
  },
};

export const RTL_LANGUAGES = ['ar'];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'navigation', 'dashboard', 'accounts', 'contacts', 'leads', 'opportunities', 'activities', 'cases', 'users', 'products', 'quotes', 'settings', 'auth', 'projects'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
