package controller;

import model.User;
import net.minidev.json.JSONObject;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.UserRepository;
import security.SessionManager;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/backend/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionManager sessionManager;

    @GetMapping("/user")
    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/login")
    public String authenticateUser(@RequestBody User user){
        User userFromDb=userRepository.findByUsernameAndPassword(user.getUsername(),user.getPassword());
        if(userFromDb != null){
            String key=RandomStringUtils.randomAlphanumeric(128);
            sessionManager.getUserSessions().put(userFromDb.getUsername(),key);
            JSONObject object=new JSONObject();
            object.put("user",userFromDb);
            object.put("key",key );
            return object.toJSONString();
        }
        return null;
    }

    @PostMapping("/logout")
    public void logoutUser(@RequestBody String username){
        sessionManager.getUserSessions().remove(username);
    }

    @PutMapping("/register")
    public void registerUser(@RequestBody User user){
        userRepository.save(user);
    }

    @PostMapping("/checkUser")
    public boolean checkIfLogged(@RequestBody String username){
        return sessionManager.getUserSessions().containsKey(username);
    }
}
