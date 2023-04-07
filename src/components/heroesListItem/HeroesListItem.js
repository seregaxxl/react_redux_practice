import './heroesListItem.scss'
import { useSelector, useDispatch } from 'react-redux';
import { heroDeleting } from '../../actions';

const HeroesListItem = ({name, text, element, id}) => {
    const {heroes} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const deleteItem = async (id, heroes) => {
        try {
          const response = await fetch(`http://localhost:3001/heroes/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            dispatch(heroDeleting(id, heroes))
          } else {
            alert('cannot be deleted')
          }
        } catch (error) {
            alert(error)
        }
      };
    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="https://gamerwall.pro/uploads/posts/2022-04/thumbs/1651011923_1-gamerwall-pro-p-neizvestnii-personazh-krasivie-oboi-1.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{text}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={() => {deleteItem(id, heroes)}} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;