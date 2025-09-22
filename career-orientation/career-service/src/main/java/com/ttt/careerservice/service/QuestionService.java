package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.QuestionResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.QuestionMapper;
import com.ttt.careerservice.model.Question;
import com.ttt.careerservice.model.Trait;
import com.ttt.careerservice.repository.QuestionRepository;
import com.ttt.careerservice.repository.TraitRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final TraitRepository traitRepository;

    public QuestionService(QuestionRepository questionRepository, TraitRepository traitRepository) {
        this.questionRepository = questionRepository;
        this.traitRepository = traitRepository;
    }

    public List<QuestionResponseDTO> getQuestions() {
        List<Question> questions = questionRepository.findAll();

        return questions.stream().map(QuestionMapper::toDTO).toList();
    }

    public QuestionResponseDTO getQuestionById(Integer id) {
        return questionRepository.findById(id).map(QuestionMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Câu hỏi không tồn tại với ID: " + id));
    }

    public List<QuestionResponseDTO> getQuestionsRandom(int totalQuestions) {
        List<Trait> traits = traitRepository.findAll();
        int traitCount = traits.size();

        //Số câu hỏi
        int perTrait = totalQuestions / traitCount;

        List<Question> result = new ArrayList<>();

        for (Trait trait : traits) {
            List<Question> questions = questionRepository.findQuestionsByTrait(trait.getCode());

            Collections.shuffle(questions);

            result.addAll(
                    questions.stream()
                            .limit(perTrait)
                            .toList()
            );
        }

        return result.stream().map(QuestionMapper::toDTO).toList();
    }
}
