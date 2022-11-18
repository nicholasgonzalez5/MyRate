/**
 * Authors:    Alyse  Palsulich, Nicholas Gonzalez
 * Date:      11-16-2022
 * Course:    CS 4540, University of Utah, School of Computing
 * Copyright: CS 4540 and Alyse Palsulich and Nicholas Gonzalez - This work may not be copied for use in Academic Coursework.
 *
 * I, Alyse Palsulich and Nicholas Gonzalez, certify that I wrote this code from scratch and did 
 * not copy it in part or whole from another source.  Any references used 
 * in the completion of the assignment are cited in my README file and in
 * the appropriate method header.
 *
 * File Contents
 * Model class for MyRate Users. Extends IdentitiyUser class.
 */
using Microsoft.AspNetCore.Identity;

namespace myrate_backend.Models
{
    public class MyRateUser : IdentityUser
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }

    }
}
