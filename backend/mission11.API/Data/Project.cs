using System.ComponentModel.DataAnnotations;

namespace Mission11.API.Data;

public class Project
{
    // These are the different things required to keep track of in our database,
    // all of these are required. 
    
    [Key]
    public int BookID { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public string Publisher { get; set; }
    [Required]
    public string ISBN { get; set; }
    [Required]
    public string Classification { get; set; }
    [Required]
    public string Category { get; set; }
    [Required]
    public int PageCount { get; set; }
    [Required]
    public float Price { get; set; }
    
    
    
}