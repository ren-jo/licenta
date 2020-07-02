package licenta.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import security.SecurityFilter;

@EnableJpaRepositories(basePackages = "repository")
@ServletComponentScan
@ComponentScan({"controller","services","security"})
@EntityScan(basePackages = {"model"})
@SpringBootApplication
public class ServerApplication {

	@Autowired
	private SecurityFilter securityFilter;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<SecurityFilter> requestFiltering(){
		FilterRegistrationBean<SecurityFilter> registrationBean
				= new FilterRegistrationBean<>();

		registrationBean.setFilter(securityFilter);
		registrationBean.addUrlPatterns(
				"/backend/forum/*",
				"/backend/project/*",
				"/backend/annotation/*",
				"/backend/imageEntity/*",
				"/backend/user",
				"/backend/export/*"
		);

		return registrationBean;
	}

//	@Bean
//	public CommandLineRunner init(UserRepository userRepository){
//		return args -> {
//			User user1=new User("Nume1","Username1","email1@test.com","123");
//			User user2=new User("Nume2","Username2","email2@test.com","123");
//			User user3=new User("Nume3","Username3","email3@test.com","123");
//
//			userRepository.save(user1);
//			userRepository.save(user2);
//			userRepository.save(user3);
//		};
//	}

}
