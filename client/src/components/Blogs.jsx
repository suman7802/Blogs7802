import BlogCard from './Card';
import SimpleButton from './SimpleButtons';

const blogPosts = [
  {
    id: 1,
    userId: 1,
    title: 'change01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ut aliquid sunt beatae recusandae magni nihil libero sed consectetur labore numquam aspernatur sapiente adipisci. Eius excepturi, quos quod quasi velit ducimus ipsam. Molestiae magnam, vero maiores optio nesciunt fugit quo expedita sunt repellendus debitis vitae error nobis dolor cum! Quaerat fuga incidunt quas provident beatae et delectus qui nam nesciunt vero. Rerum nemo incidunt reiciendis nobis aliquid quis repudiandae eveniet magni alias, ipsam hic ex iure nam accusantium cum. Ut consectetur harum molestias minima dignissimos, placeat a reprehenderit aliquam? Sit sed quis deserunt dolorem molestias quos. Quisquam accusamus pariatur sequi nemo soluta illo? Temporibus consequatur fuga facilis beatae atque nemo, necessitatibus voluptate voluptatum modi enim sequi neque iusto doloremque quis',
    picture:
      'https://res.cloudinary.com/dh8b7ohh9/image/upload/v1713952692/blogs/photo_2024-03-10%2012-1713952690784.jpg',
    private: false,
    createdAt: '2024-04-24T09:58:14.344Z',
    updatedAt: '2024-04-24T10:44:30.886Z',
    user: {
      name: 'suman sharma',
      profile:
        'https://res.cloudinary.com/dh8b7ohh9/image/upload/v1713948019/blogs/00000PORTRAIT_00000_BURST20220602180711147-1713948014050.jpg',
    },
  },
];

export default function Blogs() {
  return (
    <>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
        {blogPosts.map((blog, index) => (
          <BlogCard
            id={blog.id}
            key={index}
            title={blog.title}
            content={blog.content}
            picture={blog.picture}
            visibility={blog.private}
            name={blog.user.name}
            profile={blog.user.profile}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
          />
        ))}
      </div>
      <div className="lodeSection w-full flex items-center justify-center my-5">
        <SimpleButton text={'Lode More'} fev={false} />
      </div>
    </>
  );
}
