using System.ComponentModel.DataAnnotations;

namespace API.DTOS;
public class RegisterDto
{
    [Required]
    public string Username { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}
