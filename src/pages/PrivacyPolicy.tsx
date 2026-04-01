import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#00638a] font-bold hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} />
            Voltar para o Início
          </Link>
          <img 
            src="https://impressoranacional.com/wp-content/uploads/2024/07/Logo-Impressora-Nacional-Horizontal.png" 
            alt="Logo Impressora Nacional" 
            className="h-10"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200"
        >
          <h1 className="text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b] mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">1. Quem somos</h2>
              <p>
                A Impressora Nacional respeita a sua privacidade e está comprometida com a proteção dos dados pessoais de todos os usuários que acessam o site https://impressoranacional.com/.
              </p>
              <p>
                Esta Política de Privacidade explica de forma clara como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD) e com as exigências de plataformas de publicidade, como o Facebook (Meta Ads).
              </p>
              <p>Ao utilizar este site, você concorda com as práticas descritas nesta Política.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">2. Dados pessoais que coletamos</h2>
              <h3 className="font-bold text-slate-800 mt-4">2.1 Dados fornecidos pelo usuário</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome completo</li>
                <li>E-mail</li>
                <li>Telefone / WhatsApp</li>
                <li>Endereço (quando necessário para entrega ou orçamento)</li>
                <li>Outras informações fornecidas voluntariamente por meio de formulários</li>
              </ul>
              <p className="mt-2">Esses dados são coletados quando você preenche formulários de contato ou orçamento e entra em contato via WhatsApp ou e-mail.</p>

              <h3 className="font-bold text-slate-800 mt-4">2.2 Dados coletados automaticamente</h3>
              <p>
                Quando você navega em nosso site, algumas informações podem ser coletadas automaticamente, como endereço IP, tipo de navegador, páginas acessadas e tempo de navegação através de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">3. Finalidade do uso dos dados</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Responder solicitações de contato ou orçamento</li>
                <li>Prestar e aprimorar nossos serviços</li>
                <li>Enviar comunicações comerciais e promocionais, quando autorizado</li>
                <li>Realizar ações de marketing e publicidade</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">4. Compartilhamento de dados</h2>
              <p>A Impressora Nacional não vende dados pessoais. Podemos compartilhar informações apenas quando necessário com prestadores de serviços operacionais, plataformas de publicidade (Facebook/Google) e autoridades públicas mediante obrigação legal.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">5. Uso de cookies e pixels</h2>
              <p>Utilizamos cookies e pixels para melhorar a navegação, personalizar conteúdos e analisar métricas de desempenho. Você pode gerenciar os cookies nas configurações do seu navegador.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">6. Segurança das informações</h2>
              <p>Adotamos medidas técnicas adequadas para proteger seus dados contra acessos não autorizados ou vazamentos. Apesar disso, nenhum sistema é 100% seguro.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">7. Direitos do titular dos dados</h2>
              <p>Nos termos da LGPD, você tem o direito de acessar, corrigir, excluir ou revogar o consentimento do tratamento de seus dados a qualquer momento.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">8. Retenção dos dados</h2>
              <p>Os dados serão armazenados apenas pelo tempo necessário para cumprir as finalidades descritas ou obrigações legais.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00638a] mb-3">9. Alterações nesta Política</h2>
              <p>Esta Política pode ser atualizada a qualquer momento. Recomendamos a revisão periódica.</p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <p className="font-bold text-[#00638a]">10. Contato</p>
              <p>Dúvidas? Entre em contato pelos canais oficiais no site.</p>
              <p className="mt-4 text-sm text-slate-400">Última atualização: Janeiro de 2026</p>
              <p className="text-sm text-slate-400">Criando soluções de embalagens há 27 anos.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-slate-400 text-sm">© 2026 Impressora Nacional. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
