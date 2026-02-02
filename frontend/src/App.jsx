import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes internos (en un proyecto real irían en /components)
const Header = ({ setView, user, logout }) => (
  <header className="header">
    <div className="logo" onClick={() => setView('home')}>TOMFORD</div>
    <nav>
      <button onClick={() => setView('home')}>Fragancias</button>
      <button onClick={() => setView('story')}>World of Tom</button>
      {user ? (
        <button onClick={logout}>Salir ({user})</button>
      ) : (
        <button onClick={() => setView('login')}>Cuenta</button>
      )}
    </nav>
  </header>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>TOM FORD</h1>
      <p>Fragancias.</p>
      <button className="btn-luxury">Descubrir</button>
    </div>
  </section>
);

const ProductGrid = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Error de conexión con Base de Datos');
        return res.json();
      })
      .then(data => {
        // Validación de seguridad: solo guardar si es un array
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]);
        }
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>⚠️ {error} - Revisa la terminal del Backend</div>;

  return (
    <section className="products-section">
      <h2>Colección Privada</h2>
      <div className="grid">
        {productos.map(prod => (
          <div key={prod.id} className="card">
            <div className="img-container">
              <img src={prod.imagen_url} alt={prod.nombre} />
            </div>
            <h3>{prod.nombre}</h3>
            <p className="category">{prod.categoria}</p>
            <span className="price">${prod.precio}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Login = ({ setUser, setView }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  // Eliminamos 'email' del estado inicial, ya no es prioritario para login
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    
    const endpoint = isRegistering ? '/registro' : '/login';
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.mensaje || 'Error en la operación');

      if (isRegistering) {
        setMensaje('Cuenta creada con éxito. Ahora puedes ingresar.');
        setIsRegistering(false);
      } else {
        setUser(data.usuario);
        setView('home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="auth-tabs">
          <button 
            className={!isRegistering ? 'active' : ''} 
            onClick={() => { setIsRegistering(false); setError(''); }}
          >
            INGRESAR
          </button>
          <span className="divider">|</span>
          <button 
            className={isRegistering ? 'active' : ''} 
            onClick={() => { setIsRegistering(true); setError(''); }}
          >
            CREAR CUENTA
          </button>
        </div>

        <h2 className="auth-title">{isRegistering ? 'Bienvenido' : 'Ingreso Exclusivo'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              name="username" /* Ayuda al navegador a detectar que es el usuario */
              autoComplete="username" /* Activa el autoguardado */
              placeholder="NOMBRE DE USUARIO" 
              required
              value={formData.nombre} /* Vinculación correcta para limpiar campos */
              onChange={e => setFormData({...formData, nombre: e.target.value})} 
            />
          </div>
          
          {isRegistering && (
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                autoComplete="email"
                placeholder="EMAIL DE CONTACTO" 
                required
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
          )}
          
          <div className="input-group">
            <input 
              type="password" 
              name="password"
              autoComplete={isRegistering ? "new-password" : "current-password"} /* Diferencia crear vs entrar */
              placeholder="CONTRASEÑA" 
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          <button type="submit" className="btn-luxury full-width">
            {isRegistering ? 'REGISTRARME' : 'ENTRAR'}
          </button>
          
          {error && <p className="msg error">{error}</p>}
          {mensaje && <p className="msg success">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <Header setView={setView} user={user} logout={() => setUser(null)} />
      
      {view === 'home' && (
        <>
          <Hero />
          <div className="container">
            <ProductGrid />
          </div>
        </>
      )}

      {view === 'login' && <Login setUser={setUser} setView={setView} />}
      
      {view === 'story' && (
        <div className="container story">
          <h2>La Filosofía</h2>
          <p>La belleza es una fuerza poderosa. Define tu estilo.</p>
        </div>
      )}

      <footer>
        <p>© 2024 TOMFORD BEAUTY. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>
    </div>
  );
}

export default App;