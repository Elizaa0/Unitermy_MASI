import React, { useState, useEffect } from 'react';
import UnitermParallel from './UnitermParallel';
import { db, collection, addDoc, onSnapshot, getDocs } from './firebase';
import './UnitermApp.css';

const UnitermApp = () => {
  const [horizontalUniterm, setHorizontalUniterm] = useState('');
  const [verticalUniterm, setVerticalUniterm] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('A');
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Pobieranie historii w czasie rzeczywistym
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'uniterms'),
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null
        }));
        setHistory(docs.sort((a, b) => (b.timestamp?.getTime?.() || 0) - (a.timestamp?.getTime?.() || 0)));
      }
    );
    return () => unsubscribe();
  }, []);

  // Ręczne odświeżanie historii (pobranie najnowszych danych z bazy)
  const handleRefreshHistory = async () => {
    setRefreshing(true);
    const snapshot = await getDocs(collection(db, 'uniterms'));
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null
    }));
    setHistory(docs.sort((a, b) => (b.timestamp?.getTime?.() || 0) - (a.timestamp?.getTime?.() || 0)));
    setRefreshing(false);
  };

  const handleParallelization = async () => {
    const horizontal = horizontalUniterm.split(' ; ');
    const vertical = verticalUniterm.split(' ; ');

    let newUniterm;
    if (selectedPosition === 'A') {
      newUniterm = `(${verticalUniterm}) ; ${horizontal[1] || ''}`;
    } else {
      newUniterm = `${horizontal[0] || ''} ; (${verticalUniterm})`;
    }

    setResult(newUniterm);
    setShowResult(true);

    try {
      await addDoc(collection(db, 'uniterms'), {
        horizontal: horizontalUniterm,
        vertical: verticalUniterm,
        result: newUniterm,
        position: selectedPosition,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Błąd zapisu do Firebase:', error);
    }
  };

  // Wczytaj wizualizację z historii
  const loadFromHistory = (item) => {
    setHorizontalUniterm(item.horizontal);
    setVerticalUniterm(item.vertical);
    setResult(item.result);
    setSelectedPosition(item.position || 'A');
    setShowResult(true);
  };

  return (
    <div className="app-container">
      <div className="form-section">
        <h1>🧩 Uniterm Parallelizer</h1>

        <div className="uniterm-box">
          <label>Uniterm poziomy:</label>
          <input
            type="text"
            value={horizontalUniterm}
            onChange={(e) => setHorizontalUniterm(e.target.value)}
            placeholder="A ; B"
          />
        </div>

        <div className="uniterm-box">
          <label>Uniterm pionowy:</label>
          <input
            type="text"
            value={verticalUniterm}
            onChange={(e) => setVerticalUniterm(e.target.value)}
            placeholder="C ; D"
          />
        </div>

        <div className="position-selector">
          <label>Zastąp pozycję:</label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="position-select"
          >
            <option value="A">A (pierwsza)</option>
            <option value="B">B (druga)</option>
          </select>
        </div>

        <button onClick={handleParallelization} className="parallelize-btn">
          Zrównoleglaj →
        </button>

        {result && (
          <div className="result-section">
            <h3>Wynik:</h3>
            <div className="result-box">{result}</div>
          </div>
        )}

        <div className="history-section">
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <h3 style={{margin: 0}}>Historia operacji</h3>
            <button
              className="refresh-btn"
              onClick={handleRefreshHistory}
              disabled={refreshing}
              title="Odśwież historię"
              style={{
                marginLeft: 12,
                padding: "6px 16px",
                background: "#5b9fff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: refreshing ? "wait" : "pointer"
              }}
            >
              {refreshing ? "Odświeżam..." : "Odśwież"}
            </button>
          </div>
          <ul className="history-list">
            {history.map((item) => (
              <li
                key={item.id}
                className="history-item"
                style={{ cursor: 'pointer' }}
                title="Kliknij, by wczytać tę wizualizację"
                onClick={() => loadFromHistory(item)}
              >
                <span className="history-time">
                  {item.timestamp ? item.timestamp.toLocaleString() : ''}
                </span>
                <div className="history-content">
                  <span className="history-input">{item.horizontal}</span>
                  <span className="history-operator">+</span>
                  <span className="history-input">{item.vertical}</span>
                  <span className="history-arrow">→</span>
                  <span className="history-result">{item.result}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="visualization-section">
        <h2>Wizualizacja</h2>
        <div className="visualization-container">
          <UnitermParallel
            horizontalUniterm={horizontalUniterm}
            verticalUniterm={verticalUniterm}
            result={result}
            showResult={showResult}
            selectedPosition={selectedPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default UnitermApp;
