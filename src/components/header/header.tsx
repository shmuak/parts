import logo from '../../assets/logo.jpg';
import './header.scss';
export const Header: React.FC = () => {
    return (
        <header> 
            <div className="header-wrapper">
                <div className="header-logo">
                    <img src={logo} alt="logo" />
                    <h1>MECHANICAL</h1>
                </div>
                
                <div >
                    <h2>Enter the name of the part</h2>

                </div>
            </div>
        </header>
    )
}