export const fetchSocialProfiles = async () => {
    try {
      const response = await fetch("https://dummyapi.online/api/social-profiles");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };