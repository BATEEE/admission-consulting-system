package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.MajorGroupResponseDTO;
import com.ttt.careerservice.service.MajorGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/majorgroups")
public class MajorGroupController {
    private final MajorGroupService majorGroupService;

    public  MajorGroupController(MajorGroupService majorGroupService) {
        this.majorGroupService = majorGroupService;
    }

    @GetMapping 
    public ResponseEntity<List<MajorGroupResponseDTO>> getMajorGroups() {
        List<MajorGroupResponseDTO> majorGroupResponseDTOS = majorGroupService.getMajorGroups();

        return  ResponseEntity.ok().body(majorGroupResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MajorGroupResponseDTO> getMajorGroupById(@PathVariable Integer id) {
        MajorGroupResponseDTO majorGroupResponseDTO = majorGroupService.getMajorGroupById(id);

        return  ResponseEntity.ok().body(majorGroupResponseDTO);
    }
}
