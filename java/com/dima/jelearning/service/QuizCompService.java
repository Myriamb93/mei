package com.dima.jelearning.service;
import com.dima.jelearning.domain.Chapitre;
import com.dima.jelearning.domain.Question;
import com.dima.jelearning.domain.Quiz;
import com.dima.jelearning.domain.User;
import com.dima.jelearning.repository.*;
import com.dima.jelearning.repository.ChapitreRepository;
import com.dima.jelearning.repository.UserRepository;
import com.dima.jelearning.service.ChapitreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * Created by Dima on 10/04/2017.
 */

@Service
@Transactional
public class QuizCompService {

    private final QuizCompRepository quizCompRepository;
    private final ChapitreRepository chapitreRepository;
    private final QuizRepository quizRepository;

    private final UserRepository userRepository;

    public QuizCompService(QuizCompRepository quizCompRepository,QuizRepository quizRepository, ChapitreRepository chapitreRepository, UserRepository userRepository) {
        this.quizCompRepository = quizCompRepository;
        this.chapitreRepository = chapitreRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }


    public Quiz save(Quiz quiz) {
        Quiz result = quizRepository.save(quiz);
        return result;
    }


    @Transactional(readOnly = true)
    public User getCurrentUser(String Login) {

        User user = userRepository.getUserByLogin(Login);
        return user;
    }
}
