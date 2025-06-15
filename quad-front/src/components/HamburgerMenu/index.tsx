import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import FacultyTree from '../FacultyTree';
import { useState } from 'react';

const HamburgerMenu = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [showFacultyTree, setShowFacultyTree] = useState(false);

    return (
        <>
            <nav className='hamburger-menu'>
                <div className={`sign-in-cta ${pathname === '/auth' ? 'active' : ''}`}
                        onClick={() => navigate('/auth')}
                    >
                    <p>Sign In</p>
                </div>
                <div className='hamburger-rule'></div>
                <ul className='hamburger-list'>
                    <li className={`hamburger-list-item ${pathname === '/' ? 'active' : ''}`}
                        onClick={() => navigate('/')}
                    >
                    <div className='hamburger-icon'>
                        <i className="fa-regular fa-xl fa-house"></i>
                    </div>
                    <p className='hamburger-text'>Home</p>
                    </li>
                    <li className={`hamburger-list-item ${pathname.startsWith('/review') ? 'active' : ''}`}
                        onClick={() => setShowFacultyTree(!showFacultyTree)}
                    >
                    <div className='hamburger-icon'>
                        <i className="fa-regular fa-xl fa-pencil"></i>
                    </div>
                    <p className='hamburger-text'>Review</p>
                    </li>
                </ul>
                {showFacultyTree && (
                    <FacultyTree
                        selectedFaculty={selectedFaculty}
                        onSelectFaculty={setSelectedFaculty}
                    />
                )}
            </nav>
        </>
    );
}

export default HamburgerMenu;