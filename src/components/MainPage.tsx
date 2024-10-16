import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, Clock } from 'lucide-react';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">ADHD Body Doubling</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Boost your productivity and focus by working alongside others virtually.
        Connect with people who share similar tasks and goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Users className="w-12 h-12 mb-4" />}
          title="Connect"
          description="Match with others working on similar tasks"
        />
        <FeatureCard
          icon={<Brain className="w-12 h-12 mb-4" />}
          title="Focus"
          description="Improve concentration and productivity"
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 mb-4" />}
          title="Accomplish"
          description="Complete tasks more efficiently"
        />
      </div>
      <Link
        to="/auth"
        className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MainPage;