package com.example.demo.configs;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/rest/**", "/").authenticated()
                .antMatchers(HttpMethod.POST,"/api/storeauthcode").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout().deleteCookies("JSESSIONID")

                .and()
                .rememberMe().key("uniqueAndSecret").tokenValiditySeconds(86400)

                //.and()
                //.defaultSuccessUrl("/homepage.html", true)

                .and()
                .csrf().disable()
        ;



        /*http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/rest/**", "/").authenticated()
                .antMatchers(HttpMethod.POST,"/api/storeauthcode").permitAll()
                .and();
               // .formLogin()
                //.loginPage("/login").permitAll();
                //.defaultSuccessUrl("/homepage.html", true)
                .and()
                .logout().deleteCookies("JSESSIONID")*/

    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(myUserDetailsService)
                .passwordEncoder(myUserDetailsService.getEncoder());
    }


}
