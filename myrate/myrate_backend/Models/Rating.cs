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
 * Model class for Ratings.
 */
namespace myrate_backend.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public float Stars { get; set; }
        public string Review { get; set; }
        public MyRateUser User { get; set; }
    }
}
