// src/App.js
//https://bookshelfmanagerservice-xe5rvrfmoa-uc.a.run.app/
import React, { useState } from 'react';
import BooksManager from './components/BookManager';
import AddBook from './components/AddBook';

const App = () => {
  const [activeTab, setActiveTab] = useState('BooksManager');

  return (
    <div>
      <button onClick={() => setActiveTab('BooksManager')}>Books Manager</button>
      <button onClick={() => setActiveTab('AddBook')}>Add Book</button>

      {activeTab === 'BooksManager' && <BooksManager />}
      {activeTab === 'AddBook' && <AddBook />}
    </div>
  );
};

export default App;
