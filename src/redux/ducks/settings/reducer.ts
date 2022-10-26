import { createReducer } from '@reduxjs/toolkit';
import { loadSettingsFailure, loadSettingsSuccess, setSettingsSuccess } from './actions';
import { SettingsStore } from './store';

const initialStore: SettingsStore = {
  loading: true,
  palette: 'light',
  iconColor: 'blue',
  fontSize: '14px',
  lineHeight: '1.25',
  noWrap: true,
  defaultOpenMap: {},
  escapeBehavior: 'clear',
};

export const settingsReducer = createReducer(initialStore, (builder) => {
  builder.addCase(loadSettingsSuccess, (store, action) => {
    const initialSettings = action.payload.settings;
    return {
      ...store,
      ...initialSettings,
      loading: false,
    };
  });

  builder.addCase(loadSettingsFailure, (store, action) => {
    store.loading = false;
  });

  builder.addCase(setSettingsSuccess, (store, action) => {
    const newSettings = action.payload.settings;
    return {
      ...store,
      ...newSettings,
    };
  });
});
