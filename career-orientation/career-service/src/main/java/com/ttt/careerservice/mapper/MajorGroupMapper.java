package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.MajorGroupResponseDTO;
import com.ttt.careerservice.model.Majorgroup;

public class MajorGroupMapper {
    public static MajorGroupResponseDTO toDTO(Majorgroup majorgroup) {
        MajorGroupResponseDTO majorGroupResponseDTO = new MajorGroupResponseDTO();
        majorGroupResponseDTO.setId(majorgroup.getId());
        majorGroupResponseDTO.setCode(majorgroup.getCode());
        majorGroupResponseDTO.setName(majorgroup.getName());
        majorGroupResponseDTO.setMajors(MajorMapper.mapMajorsToDTO(majorgroup.getMajors()));
        return majorGroupResponseDTO;
    }
}
