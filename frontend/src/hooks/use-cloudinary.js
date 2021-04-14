import { useContext } from 'react';

import CloudinaryContext from '../CloudinaryContext';

const useCloudinary = () => {
    const context = useContext(CloudinaryContext);

    if (context === undefined || !context.cloudinary) {
        throw new Error('useCloudinary must be used within a CloudinaryContext!');
    }

    return context.cloudinary;
};

export default useCloudinary;