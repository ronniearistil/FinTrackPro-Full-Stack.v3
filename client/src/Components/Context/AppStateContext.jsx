import React, { createContext, useState, useContext } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  const state = {
    projects,
    setProjects,
    expenses,
    setExpenses,
    users,
    setUsers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
  };

  return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
