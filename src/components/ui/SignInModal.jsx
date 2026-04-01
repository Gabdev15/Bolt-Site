import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

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
      await Promise.all([
        mode === 'signup'
          ? createUserWithEmailAndPassword(auth, email, password).then(async (uc) => {
              await updateProfile(uc.user, { displayName: name });
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

        {loading && (
          <div className="absolute inset-0 bg-white/90 rounded-[20px] flex flex-col items-center justify-center gap-3 z-10">
            <TruckLoader />
            <p className="text-sm font-medium text-gray-500">{isSignup ? 'Création du compte...' : 'Connexion...'}</p>
          </div>
        )}

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
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-[10px] px-4 py-3 text-sm">{error}</div>
          )}
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
          <div className="flex flex-col gap-1">
            <label className="text-[#151717] font-semibold text-sm">Email <span className="text-gray-400 font-normal">(RP)</span></label>
            <div className="border border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-colors focus-within:border-blue-500">
              <EmailIcon />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email" className="ml-2 flex-1 h-full outline-none border-none bg-transparent text-sm" type="email" required />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#151717] font-semibold text-sm">Mot de passe <span className="text-gray-400 font-normal">(RP)</span></label>
            <div className="border border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-colors focus-within:border-blue-500">
              <LockIcon />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignup ? 'Créez un mot de passe' : 'Entrez votre mot de passe'} className="ml-2 flex-1 h-full outline-none border-none bg-transparent text-sm" type="password" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-2 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer hover:bg-[#2d2d2d] transition disabled:opacity-60 disabled:cursor-not-allowed">
            {isSignup ? 'Créer mon compte' : 'Se connecter'}
          </button>
          <p className="text-center text-black text-sm flex items-center gap-3 before:flex-1 before:h-px before:bg-gray-200 after:flex-1 after:h-px after:bg-gray-200">
            Ou avec
          </p>
          <button type="button" className="w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer hover:border-[#5865F2] hover:text-[#5865F2] transition text-sm">
            <DiscordIcon /> Discord
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
