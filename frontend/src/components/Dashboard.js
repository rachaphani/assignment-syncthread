import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const cards = [{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }];

    return (
        <div>
            <h2>Dashboard</h2>
            {cards.map(card => (
                <div key={card.id} onClick={() => navigate(`/map?cardId=${card.id}`)}>
                    {card.name}
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
