export const setUserStories = (stories) => {
    const userData = localStorage.getItem('user');
    let user = null;

    try {
        user = JSON.parse(userData);
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
    }

    if (user) {
        user.stories = stories;
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch a custom event to notify about the change
        window.dispatchEvent(new Event('userStoriesChanged'));
    }
};
