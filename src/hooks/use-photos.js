import { useEffect, useState } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase"

export default function usePhotos(user) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getTimelinePhotos() {
            
            if (user?.following?.length > 0) {
                const followedUserPhotos = await getPhotos(user.userId, user.following);
                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }
        getTimelinePhotos();
    }, [user.userId]);

    return { photos };
}