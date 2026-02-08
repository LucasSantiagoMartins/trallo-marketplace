import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showBottomNav = false,
  className = "" 
}) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const otherChildren = childrenArray.slice(1);

  return (
    <div className={`relative flex min-h-screen w-full mx-auto flex-col bg-background overflow-x-hidden ${showBottomNav ? 'pb-24 lg:pb-0' : ''} ${className}`}>
      {/* Render first child full-width (typically Header) */}
      {firstChild}

      {/* Constrain remaining page content to max width */}
      <div className="w-full max-w-7xl mx-auto">
        {otherChildren}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-[-100px] right-[-100px] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-100px] w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default MobileLayout;
