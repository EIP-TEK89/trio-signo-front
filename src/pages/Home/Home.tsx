import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Home/Header/Header';
import Footer from '../../components/Home/Footer/Footer';

import './Home.css';
import '../../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const Login = async () => {
    navigate('/signin');
  };

  const Courses = async () => {
    navigate('/courses');
  };

  return (
    <div className="home">
      <Header />

      <main className="main">
        <section className="description">
          <div className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-duo-blue/10">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-[40%] -right-[10%] w-[80%] h-[80%] bg-duo-blue/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] bg-duo-green/5 rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-duo-blue/10 text-duo-blue rounded-full text-sm font-medium mb-6">
                    Découvrez la Langue des Signes Française
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Apprenez à signer{' '}
                  <span className="inline-block relative text-duo-blue">
                    <span id="changing-phrase" className="inline-block">
                      Bonjour
                    </span>
                  </span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Rejoignez une communauté vivante et découvrez la richesse de la langue des signes française 
                  à travers des leçons interactives, des vidéos claires et un apprentissage personnalisé.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <button className="bg-duo-blue hover:bg-duo-blue/90 text-white h-12 px-8 text-base shadow-lg shadow-duo-blue/20 rounded-md">
                    Commencer
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 inline-block">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <button className="border border-slate-300 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 h-12 px-8 text-base rounded-md">
                    Explorer les cours
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                {[
                  'Vidéos d\'experts sourds natifs',
                  'Exercices interactifs immersifs',
                  'Apprentissage adapté à votre rythme'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center glass-card rounded-xl p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-duo-blue mr-3 h-5 w-5 flex-shrink-0">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <p className="text-sm font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          
        </section>

        <section className="live-demo">
          
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;