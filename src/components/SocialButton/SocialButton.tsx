import './SocialButton.css';

interface SocialButtonProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ title, onClick }) => {
  return (
    <div className="social-button-row">
        <button type="button" className="social-button google" onClick={onClick}>
            <span className="google-icon"></span>
            {title}
        </button>
    </div>
  )
}