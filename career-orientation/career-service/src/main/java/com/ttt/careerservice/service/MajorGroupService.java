package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.MajorGroupResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.MajorGroupMapper;
import com.ttt.careerservice.model.Majorgroup;
import com.ttt.careerservice.repository.MajorGroupRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MajorGroupService {
    private final MajorGroupRepository majorGroupRepository;

    public MajorGroupService(MajorGroupRepository majorGroupRepository) {
        this.majorGroupRepository = majorGroupRepository;
    }

    public List<MajorGroupResponseDTO> getMajorGroups() {
        List<Majorgroup> majorgroups = majorGroupRepository.findAll();

        return majorgroups.stream().map(MajorGroupMapper::toDTO).toList();
    }

    public MajorGroupResponseDTO getMajorGroupById(Integer id) {
        return majorGroupRepository.findById(id).map(MajorGroupMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Nhóm ngành không tồn tại với ID: " + id));
    }
}
