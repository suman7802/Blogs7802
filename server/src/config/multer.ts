import multer from 'multer';

const memoryStorage = multer.memoryStorage();
const uploadToMemory = multer({storage: memoryStorage});

export default uploadToMemory;
