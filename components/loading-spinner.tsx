import { Dispatch, FC, SetStateAction } from 'react';

const LoadingSpinnerComponent: FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinnerComponent;
