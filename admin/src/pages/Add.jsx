import React, { useState } from 'react';
import { assets } from '../assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', JSON.stringify(category)); // Update to handle array
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      console.log([...formData]); // Log FormData entries for debugging

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: {
          token, // Ensure correct header name
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setCategory([]);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCategoryChange = (category) => {
    setCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img src={!image1 ? assets.uploadArea : URL.createObjectURL(image1)} className="w-20" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? assets.uploadArea : URL.createObjectURL(image2)} className="w-20" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? assets.uploadArea : URL.createObjectURL(image3)} className="w-20" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.uploadArea : URL.createObjectURL(image4)} className="w-20" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type Here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write Content Here" />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Category</p>
        <div className="flex flex-wrap gap-3">
          {['bouquets', 'boxes-baskets', 'roses', 'lilies', 'add-ons', 'forever-roses', 'christmas', 'greeting-card', 'chocolates', 'teddy-bear', 'dried-flowers', 'tulips', 'sunflowers', 'daisies', 'orchids', 'mixed-flowers', 'occasions', 'birthday', 'anniversary', 'mothersday', 'fathersday', 'newyear', 'eid', 'candles', 'balloons', 'jewelry'].map((cat) => (
            <div
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-item ${category.includes(cat) ? 'selected' : ''}`}
            >
              <p>{cat}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="Number" placeholder="25" />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes((prev) => (prev.includes('Small') ? prev.filter((item) => item !== 'Small') : [...prev, 'Small']))}>
            <p className={`${sizes.includes('Small') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>Small</p>
          </div>
          <div onClick={() => setSizes((prev) => (prev.includes('Medium') ? prev.filter((item) => item !== 'Medium') : [...prev, 'Medium']))}>
            <p className={`${sizes.includes('Medium') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>Medium</p>
          </div>
          <div onClick={() => setSizes((prev) => (prev.includes('Large') ? prev.filter((item) => item !== 'Large') : [...prev, 'Large']))}>
            <p className={`${sizes.includes('Large') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>Large</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add To Bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
};

export default Add;
