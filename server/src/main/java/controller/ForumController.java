package controller;

import model.forum.Category;
import model.forum.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.CategoryRepository;
import repository.ReplyRepository;
import repository.TopicRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/backend/forum")
public class ForumController {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/category")
    public List<Category> getCategories(){
        return (List<Category>)categoryRepository.findAll();
    }

    @PutMapping("/category")
    public void persisCategory(@RequestBody Category category){
        categoryRepository.save(category);
    }

    @PutMapping("/topic")
    public void persisTopic(@RequestBody Topic topic){
        Optional<Category> category= categoryRepository.findById(topic.getCategory().getId());
        topic.setCategory(category.get());
        topicRepository.save(topic);
    }

    @GetMapping("/topic")
    public List<Topic> getTopics(){
        return (List<Topic>)topicRepository.findAll();
    }

}
