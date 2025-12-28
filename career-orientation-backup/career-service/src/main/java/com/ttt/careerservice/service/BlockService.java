package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.BlockResponseDTO;
import com.ttt.careerservice.dto.SubjectResponseDTO;
import com.ttt.careerservice.mapper.SubjectMapper;
import com.ttt.careerservice.model.Block;
import com.ttt.careerservice.model.Subject;
import com.ttt.careerservice.repository.BlockRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlockService {
    private final BlockRepository blockRepository;

    public BlockService(final  BlockRepository blockRepository) {
        this.blockRepository = blockRepository;
    }

    public List<BlockResponseDTO> getAllBlocksWithSubjects() {
        List<Block> blocks = blockRepository.findAllWithSubjects();

        return blocks.stream().map(b -> {
            BlockResponseDTO dto = new BlockResponseDTO();
            dto.setId(b.getId());
            dto.setName(b.getName());

            List<SubjectResponseDTO> subjects = b.getBlocksubjects().stream()
                    .map(bs -> {
                        Subject s = bs.getSubject();
                        return SubjectMapper.toDTO(s);
                    })
                    .collect(Collectors.toList());

            dto.setSubjects(subjects);
            return dto;
        }).collect(Collectors.toList());
    }
}
