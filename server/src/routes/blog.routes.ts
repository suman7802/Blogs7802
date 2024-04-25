import express from 'express';
import blog from '../controllers/blog';
import uploadToMemory from '../config/multer';
import validate from '../middlewares/validate.cookies';

const blogRoute = express.Router();

blogRoute.get('/blogs', blog.readAll);

blogRoute.use(validate.cookie);

blogRoute.get('/blogs/:id', blog.readOne);
blogRoute.delete('/blogs/:id', blog.delete);
blogRoute.post('/blogs', uploadToMemory.single('picture'), blog.create);
blogRoute.put('/blogs/:id', uploadToMemory.single('picture'), blog.update);

export default blogRoute;
