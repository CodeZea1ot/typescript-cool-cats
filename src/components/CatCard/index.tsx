import { FaCheck } from 'react-icons/fa'
import './index.scss'
import { CatData } from '../../types/cats'

type CatCardProps = {
    cat: CatData
    onSelect: (id: number, selected: boolean) => void
    onVote: (id: number, upvote: boolean) => void
    isSelected: boolean
}

const CatCard = (props: CatCardProps) => {
    const { cat, onSelect, isSelected } = props

    const handleSelect = () => {
        onSelect(cat.id, !isSelected)
    }

    return (
        <div className="CatCard col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className={`card ${isSelected ? 'selected' : ''}`}>
                <img
                    className="img card-img-top"
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                />

                <div className="card-body">
                    <h5 className="card-title fw-bold">{cat.name}</h5>
                    <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <button
                        className="btn btn-secondary"
                        onClick={handleSelect}
                    >
                        {isSelected ? 'Unselect' : 'Select'}
                    </button>
                    <FaCheck />
                </div>
                <div className="card-footer">
                    <button onClick={() => props.onVote(cat.id, true)}>
                        👍
                    </button>
                    <button onClick={() => props.onVote(cat.id, false)}>
                        👎
                    </button>
                    <span>Cool Points: {cat.votes}</span>
                </div>
            </div>
        </div>
    )
}

export default CatCard
