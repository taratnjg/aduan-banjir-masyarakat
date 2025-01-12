import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    // Loading state
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
    // Error state
    setError: (state, action) => {
      state.error = action.payload; // error message or null
      state.loading = false; // Stop loading when error occurs
    },

    // CRUD Operations
    setReports: (state, action) => {
      state.reports = action.payload;
      state.loading = false; // Stop loading when data is set
      state.error = null; // Reset error if successful
    },
    addReport: (state, action) => {
      state.reports.push(action.payload);
      state.loading = false; // Stop loading after report is added
      state.error = null; // Reset error if successful
    },
    updateReport: (state, action) => {
      const index = state.reports.findIndex(
        (report) => report.id === action.payload.id
      );
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
      state.loading = false; // Stop loading after report is updated
      state.error = null; // Reset error if successful
    },
    deleteReport: (state, action) => {
      state.reports = state.reports.filter(
        (report) => report.id !== action.payload
      );
      state.loading = false; // Stop loading after report is deleted
      state.error = null; // Reset error if successful
    },
    clearAllReports: (state) => {
      state.reports = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setReports,
  addReport,
  updateReport,
  deleteReport,
} = reportsSlice.actions;

// Export reducer
export default reportsSlice.reducer;
