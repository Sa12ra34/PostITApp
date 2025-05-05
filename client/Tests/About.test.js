import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import About from "../src/Components/About";
import React from "react"; 



describe("About", () => {
    it("should render the About component", () => {
        render(<About />);   
        // eslint-disable-next-line no-restricted-globals
        const abtEle = screen.getByRole('heading', {level: 1})
        expect(abtEle).toBeInTheDocument();
    });

    it("should have the text about", () => {
        render(<About />);
        // eslint-disable-next-line no-restricted-globals
        const text = screen.queryByText(/about/i); 
        expect(text).toBeInTheDocument();
    }); 


    it("should have the image", () => {
        render(<About />);
        // eslint-disable-next-line no-restricted-globals
        const image = screen.getByAltText('devimage')
        expect(image).toHaveClass('userImage');
    });  
    
    });
