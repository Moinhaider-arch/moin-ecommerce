
import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const resolveImage = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    if (Array.isArray(img)) {
      const first = img[0];
      if (!first) return '';
      if (typeof first === 'string') return first;
      if (first.secure_url) return first.secure_url;
      if (first.url) return first.url;
      return '';
    }
    if (img.secure_url) return img.secure_url;
    if (img.url) return img.url;
    return '';
  };

  const imgSrc = resolveImage(image);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-auto"
          src={imgSrc}
          alt={name || ''}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem
