
using System.ComponentModel.DataAnnotations;
/**
* Authors:   Alyse  Palsulich, Nicholas Gonzalez
* Date:      11-16-2022
* Course:    CS 4500, University of Utah, School of Computing
* Copyright: CS 4500 and Alyse Palsulich, Nicholas Gonzalez, Justin Springborn, and Rosemary Yoo - This work may not be copied for use in Academic Coursework.
*
* I, Alyse Palsulich, Nicholas Gonzalez, Justin Springborn, and Rosemary Yoo,
* certify that I wrote this code from scratch and did not copy it in part or 
* whole from another source. Any references used in the completion of the assignment 
* are cited in my README file and in the appropriate method header.
*
* File Contents
* Model class for Books. Extends Media class.
*/
namespace myrate_backend.Models
{
    public class Book : Media
    {
        public int ID { get; set; }
        [Display(Name = "Author")]
        public string? Author { get; set; }
        [Display(Name = "Summary of Book")]
        public string? Summary { get; set; }
        // In future we will add more properties such as tags
    }
}
