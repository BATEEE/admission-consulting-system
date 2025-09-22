package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.AnswerResponseDTO;
import com.ttt.careerservice.exception.EmailAlreadyExistsException;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.AnswerMapper;
import com.ttt.careerservice.model.Answer;
import com.ttt.careerservice.repository.AnswerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public List<AnswerResponseDTO> getAnswers() {
        List<Answer> answers = answerRepository.findAll();

        return answers.stream().map(AnswerMapper::toDTO).toList();
    }

    public List<AnswerResponseDTO> getAnswersByQuestionId(Integer questionId) {
        if(!answerRepository.existsByQuestionId(questionId)) {
            throw new ResourceNotFoundException("Câu hỏi không tồn tại với id: " + questionId);
        }

        List<Answer> answers = answerRepository.findByQuestionId(questionId);

        return answers.stream().map(AnswerMapper::toDTO).toList();
    }

    public AnswerResponseDTO getAnswerById(Integer id) {
        return answerRepository.findById(id).map(AnswerMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Câu hỏi không tồn tại với ID: " + id));
    }
}
