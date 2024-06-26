import React, { useEffect, useState } from 'react';
import './Story.css';
import Storyadd from './Storyadd';

const Story = (props) => {
    const [user, setUser] = useState(null);
    const [story, setStory] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        let parsedUser = null;
        try {
            parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }
    }, []);

    const getStory = async () => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:8800/api/user/get-story/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            const storyData = await response.json();
            setStory(storyData);
        } catch (error) {
            console.error('Error fetching story:', error);
        }
    };

    useEffect(() => {
        if (user) {
            getStory();
        }
    }, [user]);

    useEffect(() => {
        const handleStoriesChange = () => getStory();
        window.addEventListener('userStoriesChanged', handleStoriesChange);

        return () => {
            window.removeEventListener('userStoriesChanged', handleStoriesChange);
        };
    }, [user]);

    if (props.use === 'main') {
        return (
            <>
                {user && Array.isArray(user.stories) && user.stories.length > 0 ? (
                    <div className="full-story">
                        <div className="story-outer">
                            <img src={story.length > 0 ? story[0].storyImg : 'https://via.placeholder.com/150'} alt="Story" />
                        </div>
                        <p>{user.username}</p>
                    </div>
                ) : (
                    <Storyadd />
                )}
            </>
        );
    } else {
        return (
            <div className="full-story">
                <div className="story-outer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDdbdXLkTbDs7Rc865Ub8SngnR4NMiI3rBA&usqp=CAU" alt="Other user story" />
                </div>
                <p>other user</p>
            </div>
        );
    }
};

export default Story;
