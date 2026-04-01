import React, { useState } from 'react';
import { Menu, X, Plus, Minus } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './Dashboard';

const TruckLoader = () => (
  <div className="loader">
    <div className="truckWrapper">
      <div className="truckBody">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
          <path strokeWidth="3" stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"></path>
          <path strokeWidth="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"></path>
          <path strokeWidth="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"></path>
          <rect strokeWidth="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"></rect>
          <rect strokeWidth="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193"></rect>
          <rect strokeWidth="3" stroke="#282828" fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5"></rect>
          <rect strokeWidth="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect>
        </svg>
      </div>
      <div className="truckTires">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
          <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
          <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
      </div>
      <div className="road"></div>
      <svg xmlSpace="preserve" viewBox="0 0 453.459 453.459" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="lampPost">
        <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"></path>
      </svg>
    </div>
  </div>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="#5865F2">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20" className="shrink-0 text-gray-400">
    <g data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" fill="currentColor"></path></g>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20" className="shrink-0 text-gray-400">
    <path fill="currentColor" d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
    <path fill="currentColor" d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
  </svg>
);

const SignInModal = ({ onClose }) => {
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 200);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const [result] = await Promise.all([
        mode === 'signup'
          ? createUserWithEmailAndPassword(auth, email, password).then(async (uc) => {
              await updateProfile(uc.user, { displayName: name });
              return uc;
            })
          : signInWithEmailAndPassword(auth, email, password),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => handleClose(), 2200);
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'Cette adresse email est déjà utilisée.',
        'auth/invalid-email': 'Adresse email invalide.',
        'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
        'auth/invalid-credential': 'Email ou mot de passe incorrect.',
        'auth/user-not-found': 'Aucun compte trouvé avec cet email.',
        'auth/wrong-password': 'Mot de passe incorrect.',
      };
      setError(messages[err.code] || 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const isSignup = mode === 'signup';

  return (
  <div
    className={`modal-backdrop${closing ? ' closing' : ''} fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4`}
    onClick={(e) => e.target === e.currentTarget && handleClose()}
  >
    <form onSubmit={handleSubmit} className={`modal-card${closing ? ' closing' : ''} bg-white rounded-[20px] p-8 w-full max-w-[450px] flex flex-col gap-3 relative`}>
      <button type="button" onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
        <X size={20} />
      </button>

      {/* Toggle tabs */}
      <div className="relative flex bg-gray-100 rounded-[12px] p-1 mb-1">
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-[10px] shadow transition-all duration-300 ease-in-out"
          style={{ left: isSignup ? '4px' : '50%' }}
        />
        <button type="button" onClick={() => switchMode('signup')}
          className={`relative z-10 flex-1 py-2 rounded-[10px] text-sm font-semibold transition-colors duration-200 ${isSignup ? 'text-[#151717]' : 'text-gray-500 hover:text-gray-700'}`}>
          S'inscrire
        </button>
        <button type="button" onClick={() => switchMode('login')}
          className={`relative z-10 flex-1 py-2 rounded-[10px] text-sm font-semibold transition-colors duration-200 ${!isSignup ? 'text-[#151717]' : 'text-gray-500 hover:text-gray-700'}`}>
          Se connecter
        </button>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/90 rounded-[20px] flex flex-col items-center justify-center gap-3 z-10">
          <TruckLoader />
          <p className="text-sm font-medium text-gray-500">{isSignup ? 'Création du compte...' : 'Connexion...'}</p>
        </div>
      )}

      {/* Success overlay */}
      {success && (
        <div className="absolute inset-0 bg-white rounded-[20px] flex flex-col items-center justify-center gap-5 z-10 success-wrapper">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="45" cy="45" r="42" stroke="#e6e6e6" strokeWidth="3" />
            <circle cx="45" cy="45" r="42" stroke="#32BB78" strokeWidth="3.5" strokeLinecap="round" className="success-circle" transform="rotate(-90 45 45)" />
            <polyline points="27,46 39,58 63,32" stroke="#32BB78" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="success-check" />
          </svg>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#151717]">{isSignup ? 'Bienvenue !' : 'Connecté !'}</h3>
            <p className="text-gray-400 text-sm mt-1">{isSignup ? 'Votre compte a été créé avec succès.' : 'Vous êtes maintenant connecté.'}</p>
          </div>
        </div>
      )}

      <div key={mode} className="form-content flex flex-col gap-3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-[10px] px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Nom (signup only) */}
        {isSignup && (
          <div className="flex flex-col gap-1">
            <label className="text-[#151717] font-semibold text-sm">Nom complet <span className="text-gray-400 font-normal">(RP)</span></label>
            <div className="border border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-colors focus-within:border-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez votre nom" className="ml-2 flex-1 h-full outline-none border-none bg-transparent text-sm" type="text" required />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-[#151717] font-semibold text-sm">Email <span className="text-gray-400 font-normal">(RP)</span></label>
          <div className="border border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-colors focus-within:border-blue-500">
            <EmailIcon />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email" className="ml-2 flex-1 h-full outline-none border-none bg-transparent text-sm" type="email" required />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-[#151717] font-semibold text-sm">Mot de passe <span className="text-gray-400 font-normal">(RP)</span></label>
          <div className="border border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-colors focus-within:border-blue-500">
            <LockIcon />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignup ? 'Créez un mot de passe' : 'Entrez votre mot de passe'} className="ml-2 flex-1 h-full outline-none border-none bg-transparent text-sm" type="password" required />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="mt-2 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer hover:bg-[#2d2d2d] transition disabled:opacity-60 disabled:cursor-not-allowed">
          {isSignup ? 'Créer mon compte' : 'Se connecter'}
        </button>

        {/* Divider */}
        <p className="text-center text-black text-sm flex items-center gap-3 before:flex-1 before:h-px before:bg-gray-200 after:flex-1 after:h-px after:bg-gray-200">
          Ou avec
        </p>

        {/* Discord button */}
        <button type="button" className="w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer hover:border-[#5865F2] hover:text-[#5865F2] transition text-sm">
          <DiscordIcon /> Discord
        </button>
      </div>
    </form>
  </div>
  );
};

const Navbar = ({ onSignIn, onDashboard, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'Produits', href: '#produits' },
    { label: 'Clients', href: '#clients' },
    { label: 'Chauffeurs', href: '#chauffeurs' },
    { label: 'Flottes', href: '#flottes' },
    { label: 'FAQ', href: '#entreprise' },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bolt-dark/95 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <a href="#" className="block">
                {/* White Logo */}
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4yNjIgMHYzMC4wNzRoLTcuMTM2VjEuNTA0TDU1LjI2MiAwek0zNC45NDUgMzIuOTI0YzEuOTcgMCAzLjU2OCAxLjU4NCAzLjU2OCAzLjUzOCAwIDEuOTU0LTEuNTk4IDMuNTM4LTMuNTY4IDMuNTM4cy0zLjU2OC0xLjU4NC0zLjU2OC0zLjUzOGMwLTEuOTU0IDEuNTk3LTMuNTM4IDMuNTY4LTMuNTM4em0wLTI0LjM4M2M2LjA3NSAwIDExLjAxIDQuODg0IDExLjAxIDEwLjkxOCAwIDYuMDM1LTQuOTM1IDEwLjkyLTExLjAxIDEwLjkyLTYuMDg1IDAtMTEuMDEtNC44ODUtMTEuMDEtMTAuOTIgMC02LjAzNCA0LjkzNS0xMC45MTggMTEuMDEtMTAuOTE4em0wIDE0LjQ1NmMxLjk3MiAwIDMuNTY4LTEuNTgyIDMuNTY4LTMuNTM4IDAtMS45NTUtMS41OTYtMy41MzgtMy41NjgtMy41MzhzLTMuNTY4IDEuNTgzLTMuNTY4IDMuNTM4YzAgMS45NTYgMS41OTYgMy41MzggMy41NjggMy41Mzh6bS0yMi40NDggMGMxLjIzIDAgMi4yMy0uOTkyIDIuMjMtMi4yMWEyLjIyNCAyLjIyNCAwIDAwLTIuMjMtMi4yMTJINy4xNDZ2NC40MjJoNS4zNTF6TTcuMTQ2IDcuMDc3djQuNDIyaDMuOTY0YzEuMjI5IDAgMi4yMy0uOTkzIDIuMjMtMi4yMTJhMi4yMjQgMi4yMjQgMCAwMC0yLjIzLTIuMjFINy4xNDZ6bTExLjkyMiA3LjA5NWMxLjcyNCAxLjY5IDIuNzk1IDQuMDMgMi43ODUgNi42MTQgMCA1LjEzLTQuMTkyIDkuMjg4LTkuMzY2IDkuMjg4SDBWMGgxMS4xYzUuMTczIDAgOS4zNjUgNC4xNTcgOS4zNjUgOS4yODcgMCAxLjc5LS41MDUgMy40Ny0xLjM5NyA0Ljg4NXpNNjguNzQgMTYuMDJoLTMuNTU4djUuNTUzYzAgMS42OC41NDUgMi45MTggMS45NzIgMi45MTguOTIyIDAgMS41OTYtLjIwNiAxLjU5Ni0uMjA2djUuMjA5cy0xLjQ3Ny44ODQtMy40NzkuODg0aC0uMDg5Yy0uMDkgMC0uMTY4LS4wMS0uMjU4LS4wMWgtLjA2OWMtLjA0IDAtLjA5LS4wMS0uMTI5LS4wMS0zLjk4NC0uMjA2LTYuNjktMi42OTItNi42OS03LjAwN1Y1LjA0MWw3LjEzNi0xLjUwM3Y1LjQwNWgzLjU2OHY3LjA3N3oiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=" alt="Bolt" className="h-8" />
              </a>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className="text-white font-bold text-sm hover:text-bolt-green transition-colors">
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-sm font-bold bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K" alt="FR" className="w-5 h-auto mr-2 rounded-sm" />
                <span>FR</span>
              </button>
{user ? (
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-sm">{user.displayName || user.email}</span>
                  <button onClick={onDashboard} className="bg-bolt-green text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#29a366] transition shadow-sm">
                    Conduire maintenant
                  </button>
                  <button onClick={() => signOut(auth)} className="bg-white/10 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition border border-white/20">
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button onClick={onSignIn} className="bg-white text-bolt-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition shadow-sm">
                  S'inscrire
                </button>
              )}
            </div>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white bg-white/10 p-2 rounded-full">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-bolt-dark fixed inset-0 top-20 z-40 overflow-y-auto px-6 pb-6 border-t border-gray-800">
          <div className="space-y-6 pt-6">
             {navLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setIsOpen(false)} className="block text-2xl font-bold text-white">
                  {label}
                </a>
              ))}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-white font-bold text-lg">{user.displayName || user.email}</p>
                    <button onClick={() => { onDashboard(); setIsOpen(false); }} className="w-full bg-bolt-green text-white px-6 py-4 rounded-full font-bold text-lg">
                      Conduire maintenant
                    </button>
                    <button onClick={() => signOut(auth)} className="w-full bg-white/10 text-white px-6 py-4 rounded-full font-bold text-lg border border-white/20">
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <button onClick={onSignIn} className="w-full bg-white text-bolt-dark px-6 py-4 rounded-full font-bold text-lg">
                    S'inscrire
                  </button>
                )}
                 <div className="flex items-center justify-between text-white">
                    <button className="flex items-center text-sm font-bold bg-white/10 px-4 py-2 rounded-full">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K" alt="FR" className="w-5 h-auto mr-2 rounded-sm" />
                        <span>FR</span>
                    </button>
                 </div>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative min-h-[600px] lg:h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://madeinvilnius.lt/wp-content/uploads/2025/06/bolt-drive-automobilis-vw-id-buzz-5-scaled.jpg)' }}>
      {/* Dark overlay gradient - from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 w-full pt-32">
        <div className="max-w-4xl mr-auto text-left">
          <div className="inline-block text-gray-300/80 text-xl font-bold mb-4 tracking-wide">
            Bolt Drive
          </div>
          <h1 className="text-5xl md:text-[80px] leading-[1.1] font-bold text-white mb-8 tracking-tight">
            Pourquoi conduire quand il y a Bolt ?
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl">
            Pas de vérifications de service, de formulaires d'assurance, de prix de carburant ou de frais de stationnement. Roulez dans des voitures neuves à des tarifs bas avec les locations de voitures Bolt Drive. L'agence Bolt s'est étendue en Amérique à Townsend.
          </p>
          <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition shadow-lg inline-flex items-center transform hover:scale-[1.02] duration-200">
            Commencer à conduire
          </button>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div id="produits" className="py-40 bg-[#0E1010] text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-32 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Location à la demande</h2>
          <p className="text-3xl text-gray-400">Payez pour le temps et la distance parcourus, rien de plus.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-20">
           <div className="group text-center md:text-left">
              <div className="mb-12 h-[500px] w-full flex items-center justify-center">
                  <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_2_24b4eed746.webp" alt="Minutes" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
              </div>
              <h3 className="text-4xl font-bold mb-6">Rouler pour quelques minutes</h3>
              <p className="text-gray-400 leading-relaxed text-2xl">Réservez une voiture, déverrouillez-la avec votre téléphone, et payez pour le temps ou la distance parcourue.</p>
           </div>
           <div className="group text-center md:text-left">
              <div className="mb-12 h-[500px] w-full flex items-center justify-center">
                  <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_1_fc24e16faf.webp" alt="Days" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
              </div>
              <h3 className="text-4xl font-bold mb-6">Rouler pour plusieurs jours</h3>
              <p className="text-gray-400 leading-relaxed text-2xl">Louez à long terme, payez un tarif fixe affiché à l'avance, et réservez jusqu'à 30 jours à l'avance.</p>
           </div>
           <div className="group text-center md:text-left">
              <div className="mb-12 h-[500px] w-full flex items-center justify-center">
                  <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_3_a55319cc15.webp" alt="Parking" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
              </div>
              <h3 className="text-4xl font-bold mb-6">Stationner gratuitement</h3>
              <p className="text-gray-400 leading-relaxed text-2xl">Pas de frais dans les zones désignées, que vous fassiez une pause ou terminiez votre trajet.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ number, title, description, image }) => (
  <div className="flex flex-col md:flex-row items-center gap-24 mb-32 last:mb-0">
    <div className={`w-full md:w-1/2 ${number % 2 === 0 ? 'md:order-2' : ''}`}>
      <img src={image} alt={title} className="rounded-[40px] w-full shadow-2xl" />
    </div>
    <div className={`w-full md:w-1/2 ${number % 2 === 0 ? 'md:order-1' : ''}`}>
      <div className="bg-[#EBF9F1] text-bolt-green font-bold w-16 h-16 rounded-full flex items-center justify-center mb-8 text-2xl">
        {number}
      </div>
      <h3 className="text-5xl font-bold mb-6 text-bolt-dark">{title}</h3>
      <p className="text-gray-500 text-2xl leading-relaxed">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <div id="clients" className="py-40 bg-[#F5F6F7]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-32">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bolt-dark">Commencer à conduire</h2>
          <p className="text-3xl text-gray-500 mb-12">Louez une voiture plus rapidement que trouver une place de parking.</p>
          <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition transform hover:scale-[1.02]">
            Commencer à conduire
          </button>
        </div>
        
        <div className="max-w-[1400px] mx-auto">
          <Step 
            number={1}
            title="Créer un compte"
            description="Tout ce dont vous avez besoin est un permis de conduire valide et une carte de crédit."
            image="https://assets.cms.bolt.eu/Bolt_Drive_Media_13_d6f922ca54.webp"
          />
          <Step 
            number={2}
            title="Trouver une voiture à proximité"
            description="Localisez une voiture en utilisant la carte de l'application ou en repérant une dans la rue."
            image="https://assets.cms.bolt.eu/Bolt_Drive_Media_12_b008054e3e.webp"
          />
          <Step 
            number={3}
            title="Déverrouiller avec l'application"
            description="Tout ce dont vous avez besoin, c'est de votre téléphone pour entrer, les clés sont à l'intérieur."
            image="https://assets.cms.bolt.eu/Bolt_Drive_Media_11_e830d4118c.webp"
          />
           <Step 
            number={4}
            title="Terminer votre trajet"
            description="Garez-vous, laissez la clé à l'intérieur et poursuivez votre journée."
            image="https://assets.cms.bolt.eu/Bolt_Drive_Media_10_e2c56e25dc.webp"
          />
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => (
  <div id="chauffeurs" className="py-48 relative overflow-hidden">
     {/* Background Image Container */}
    <div className="absolute inset-0 z-0">
        <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_9_e2fbc8e66e.webp" className="w-full h-full object-cover" alt="Testimonial background" />
        <div className="absolute inset-0 bg-black/40"></div>
    </div>

    <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center text-white">
      <blockquote className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        « Je trouve que l'application est aussi assez intuitive. J'aime beaucoup le compteur qui montre pendant que vous conduisez combien vous dépensez, ce que les autres applications n'ont pas. »
      </blockquote>
      <div className="font-bold text-2xl">Nikhil (Berlin)</div>
      <div className="opacity-90 mt-2 text-xl">Utilisateur de Bolt Drive</div>
    </div>
  </div>
);

const CarType = ({ title, desc, img }) => (
  <div className="group cursor-pointer">
    <div className="h-[400px] bg-gray-100 rounded-[32px] mb-8 overflow-hidden relative">
        <img src={img} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
    </div>
    <h3 className="text-3xl font-bold mb-3 text-bolt-dark">{title}</h3>
    <p className="text-gray-500 text-xl">{desc}</p>
  </div>
);

const VehicleTypes = () => (
  <div id="flottes" className="py-40 bg-white">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
       <div className="mb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bolt-dark">Louez la voiture qu'il vous faut</h2>
          <p className="text-3xl text-gray-500 max-w-5xl">Petite ou grande, économique ou premium. Toutes les voitures sont entièrement assurées, avec le plein et prêtes à rouler.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <CarType title="Voitures de tous les jours" desc="Quand vous avez juste besoin de roues." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_8_b36cd35d7b.webp" />
          <CarType title="SUVs" desc="Quand vous avez besoin de sièges supplémentaires." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_7_30e438e9a1.webp" />
          <CarType title="Vans et camions" desc="Quand vous avez du cargo à transporter." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_6_c5c718bad6.webp" />
          <CarType title="Voitures de luxe" desc="Quand vous voulez conduire avec style." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_5_0cbbe86e4e.webp" />
          <CarType title="Voitures de tiers" desc="Louez en quelques minutes avec Bolt Drive." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_4_1e03231590.webp" />
        </div>
    </div>
  </div>
);

const PricingTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="py-40 bg-[#F5F6F7]">
             <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                <div className="mb-24">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-bolt-dark">Payez à la minute, à la journée, ou à la distance</h2>
                    <p className="text-3xl text-gray-500 max-w-5xl">Tous les tarifs incluent l'assurance, le carburant, et le stationnement. Rendez-vous sur l'application pour explorer les fonctionnalités de sécurité, contacter le support 24/7, ou voir quelles options sont disponibles dans votre région.</p>
                </div>

                {/* Tabs Header */}
                <div className="flex border-b border-gray-300 mb-16">
                    <button 
                        className={`pb-6 px-4 mr-12 font-bold text-2xl border-b-4 transition-colors ${activeTab === 0 ? 'border-bolt-dark text-bolt-dark' : 'border-transparent text-gray-500 hover:text-bolt-dark'}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Prépaiement
                    </button>
                    <button 
                        className={`pb-6 px-4 font-bold text-2xl border-b-4 transition-colors ${activeTab === 1 ? 'border-bolt-dark text-bolt-dark' : 'border-transparent text-gray-500 hover:text-bolt-dark'}`}
                         onClick={() => setActiveTab(1)}
                    >
                        Locations longue durée
                    </button>
                </div>

                {/* Tab Content */}
                 <div className="bg-white rounded-[40px] p-12 md:p-20 shadow-sm">
                    {activeTab === 0 && (
                        <div className="grid md:grid-cols-2 gap-20 items-center">
                            <div>
                                <h3 className="text-5xl font-bold mb-8 text-bolt-dark">Réservez et partez à tout moment</h3>
                                <p className="text-2xl text-gray-500 mb-12">Payez à la minute ou au kilomètre et conduisez aussi longtemps et aussi loin que vous le souhaitez.</p>
                                <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition">
                                    Commencer dès maintenant
                                </button>
                            </div>
                            <div className="order-first md:order-last">
                                <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_16_f6e3c84092.webp" alt="Prepayment" className="w-full rounded-[32px]" />
                            </div>
                        </div>
                    )}
                    {activeTab === 1 && (
                         <div className="grid md:grid-cols-2 gap-20 items-center">
                            <div>
                                <h3 className="text-5xl font-bold mb-8 text-bolt-dark">Réservez jusqu'à 30 jours à l'avance</h3>
                                <p className="text-2xl text-gray-500 mb-12">Payez un tarif fixe pour le nombre exact d'heures ou de jours pendant lesquels vous avez besoin de conduire.</p>
                                <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition">
                                    Commencer dès maintenant
                                </button>
                            </div>
                             <div className="order-first md:order-last">
                                <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_15_8a3be56ca6.webp" alt="Long Term" className="w-full rounded-[32px]" />
                            </div>
                        </div>
                    )}
                </div>
             </div>
        </div>
    );
}

const CitySection = () => (
    <div className="relative py-48 bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(https://assets.cms.bolt.eu/Bolt_Drive_Media_18_2312b11f16.webp)' }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 text-center">
             <div className="max-w-4xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Bolt Drive dans votre ville</h2>
                 <p className="text-xl text-gray-200 mb-10 leading-relaxed">Consultez l'application pour trouver des parkings gratuits, des bornes de recharge et plus encore.</p>
                 <button className="bg-bolt-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#29a366] transition shadow-lg inline-flex items-center">
                    Ouvrir Bolt
                </button>
             </div>
        </div>
    </div>
);


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 py-10 last:border-0">
      <button 
        className="w-full flex justify-between items-start text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-3xl font-bold pr-12 text-white group-hover:text-bolt-green transition-colors">{question}</h3>
        <span className="flex-shrink-0 mt-2 bg-white/10 rounded-full p-2 group-hover:bg-bolt-green group-hover:text-white transition-colors">
          {isOpen ? <Minus size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-8 text-gray-400 leading-relaxed max-w-4xl text-xl">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <div id="entreprise" className="py-40 bg-[#0E1010] text-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-5xl md:text-7xl font-bold mb-20">Foire aux questions</h2>
      <FAQItem 
        question="Qu'en est-il du stationnement ? Où puis-je me garer avec Bolt Drive ?"
        answer="Lorsque vous louez une voiture avec Bolt Drive, les frais de stationnement sont inclus dans le prix de votre location, pour que vous puissiez profiter du stationnement gratuit dans la zone opérationnelle dès que vous avez besoin de faire un arrêt. Néanmoins, vous devez toujours vérifier les règles de circulation locales si vous pouvez y laisser la voiture. Le parking privé (supermarchés, garages, etc.) n'est pas couvert."
      />
      <FAQItem 
        question="Que se passe-t-il si je raye ou endommage la voiture ?"
        answer="En cas d'endommagement de la voiture, des frais peuvent vous être facturés. Pour plus de détails, veuillez lire les Conditions d'utilisation de Bolt Drive."
      />
      <FAQItem 
        question="Quel type de voiture puis-je louer avec Bolt Drive?"
        answer="La marque et le modèle spécifique de la voiture de location dépendent de la disponibilité. Nos catégories de véhicules sont les suivantes : citadine, compacte, électrique et SUV."
      />
      <FAQItem 
        question="Comment payer pour Bolt Drive ?"
        answer="Payez simplement avec votre appli Bolt comme vous le feriez pour un trajet Bolt ou une trottinette (carte de crédit/débit ou Apple Pay)."
      />
       <FAQItem 
        question="Comment déverrouiller une voiture Bolt Drive ?"
        answer="Une fois que vous avez trouvé la voiture que vous souhaitez louer, il vous suffit d'appuyer sur le bouton dans votre appli Bolt pour déverrouiller le véhicule et commencer à conduire !"
      />
       <FAQItem 
        question="Où je trouve les clés de la voiture ?"
        answer="Une fois que vous avez déverrouillé la voiture avec votre appli Bolt, vous trouverez les clés à l'intérieur de la voiture."
      />
       <FAQItem 
        question="Puis-je faire des trajets interurbains avec les voitures Bolt Drive ?"
        answer="Certains véhicules prennent en charge les voyages interurbains, et des frais interurbains sont facturés à la fin du trajet. Veuillez consulter la section Aide de la carte du véhicule pour obtenir la liste des villes où vous pouvez terminer un trajet."
      />
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#F5F6F7] pt-40 pb-20 border-t border-gray-200">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Services</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            <li><a href="#" className="hover:text-bolt-green">Trajets</a></li>
            <li><a href="#" className="hover:text-bolt-green">Trottinettes</a></li>
            <li><a href="#" className="hover:text-bolt-green">Vélos électriques</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Drive</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Food</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Market</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Business</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Plus</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Générer des revenus</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            <li><a href="#" className="hover:text-bolt-green">Chauffeurs partenaires</a></li>
            <li><a href="#" className="hover:text-bolt-green">Livraison Bolt</a></li>
            <li><a href="#" className="hover:text-bolt-green">Commerçants</a></li>
            <li><a href="#" className="hover:text-bolt-green">L'équipe Bolt</a></li>
            <li><a href="#" className="hover:text-bolt-green">Bolt Franchise</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Entreprise</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            <li><a href="#" className="hover:text-bolt-green">À propos</a></li>
            <li><a href="#" className="hover:text-bolt-green">Carrières</a></li>
            <li><a href="#" className="hover:text-bolt-green">Durabilité</a></li>
            <li><a href="#" className="hover:text-bolt-green">Presse</a></li>
            <li><a href="#" className="hover:text-bolt-green">Blog</a></li>
             <li><a href="#" className="hover:text-bolt-green">Lignes directrices de marque</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Support</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            <li><a href="#" className="hover:text-bolt-green">Clients</a></li>
            <li><a href="#" className="hover:text-bolt-green">Chauffeur</a></li>
             <li><a href="#" className="hover:text-bolt-green">Livreur</a></li>
              <li><a href="#" className="hover:text-bolt-green">Flottes</a></li>
               <li><a href="#" className="hover:text-bolt-green">Restaurants</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-200 space-y-4">
        <p className="text-center text-bolt-dark font-bold text-sm">
          ⚠️ Ce site est un projet RP uniquement — il ne représente pas le vrai site de l'entreprise Bolt et n'y est pas affilié.
        </p>
        <div className="flex justify-end">
          <button className="flex items-center text-lg font-bold bg-white border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K" alt="FR" className="w-6 h-auto mr-2 rounded-sm" />
            <span>FR</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
);

const RPBanner = () => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-bolt-green text-white px-4 py-3 flex items-center justify-between gap-4 shadow-md">
      <div className="flex-1 text-center text-sm font-medium">
        ⚠️ Ce site est un projet <strong>RP uniquement</strong> — il ne représente pas le vrai site de l'entreprise Bolt et n'y est pas affilié.
      </div>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 text-white/80 hover:text-white transition"
        aria-label="Fermer"
      >
        <X size={18} />
      </button>
    </div>
  );
};

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-bolt-dark selection:bg-bolt-green selection:text-white">
      <RPBanner />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showDashboard && user && <Dashboard user={user} onClose={() => setShowDashboard(false)} />}
      <Navbar onSignIn={() => setShowSignIn(true)} onDashboard={() => setShowDashboard(true)} user={user} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonial />
        <VehicleTypes />
        <PricingTabs />
        <CitySection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
