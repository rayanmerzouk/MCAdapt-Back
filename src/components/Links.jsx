import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Links = () => {
    
   

    return (
        <div className="grid grid-cols-[1fr_2fr_2fr] font-poppins-light text-sm">
            <div className="relative">
                <Link to="/shop" className="mt-30px relative top-1" >
                    <p >
                        Shop
                    </p>
                </Link>

                {/* Menu déroulant */}
               
            </div>

            
           
            <Link to="/publier" className="m-auto">Add</Link>
            <Link to="/contact" className="m-auto">Contact</Link>
        </div>
    );
};

export default Links;
