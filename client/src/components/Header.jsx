import React from 'react';

export const Header = () => {
    return (
        <header>
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                <span>FinTrack AI</span>
            </div>
            <div className="user-profile">
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>K</div>
            </div>
        </header>
    )
}
