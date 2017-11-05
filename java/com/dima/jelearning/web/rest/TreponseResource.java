package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.domain.User;
import com.dima.jelearning.security.SecurityUtils;
import com.dima.jelearning.service.TquizService;
import com.dima.jelearning.service.TreponseService;
import com.dima.jelearning.service.TresultService;
import com.dima.jelearning.service.dto.TreponseDTO;
import com.dima.jelearning.service.dto.TresultDTO;
import com.dima.jelearning.domain.Treponse;
import com.dima.jelearning.service.dto.UserDTO;
import com.dima.jelearning.service.mapper.UserMapper;
import com.dima.jelearning.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dima.jelearning.service.UserService;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ListIterator;


/**
 * REST controller for managing Treponse.
 */

@RestController
@RequestMapping("/api")
public class TreponseResource {

    private final Logger log = LoggerFactory.getLogger(TreponseResource.class);

    private static final String ENTITY_NAME = "treponse";

    private final TreponseService treponseService;

    private final UserService userService;

    private final TresultService tresultService;

    private final TquizService tquizService;



    public TreponseResource(TreponseService treponseService, UserService userService, TresultService tresultService, TquizService tquizService) {
        this.treponseService = treponseService;
        this.userService = userService;
        this.tresultService = tresultService;
        this.tquizService = tquizService;
    }

    @GetMapping("/xxx")
    public ResponseEntity<UserDTO> returnUser (){
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userService.userToUserDTO(userService.getCurrentUser(SecurityUtils.getCurrentUserLogin()))));
    }



    @PostMapping("/treponses/qcm/{id}")
    @Timed
    public ResponseEntity<TresultDTO> saveQcm(@RequestBody List<TreponseDTO> treponseDTOList, @PathVariable Long id) {
        log.debug("REST request to save QCM and return Final Result");

        TresultDTO tresultDTO = new TresultDTO();

        tresultDTO.setResult(0.00f);
        tresultDTO.setDate(ZonedDateTime.now());

        tresultDTO.setResultUserId(userService.getCurrentUser(SecurityUtils.getCurrentUserLogin()));
        tresultDTO.setNbre(treponseDTOList.size());

        tresultDTO.setResultQuizId(this.tquizService.findOne(id));

        tresultDTO = tresultService.save(tresultDTO);

        ListIterator<TreponseDTO> it = treponseDTOList.listIterator();

        while(it.hasNext()){
            TreponseDTO treponseDTO = it.next();
            treponseDTO.setReponseResultId(tresultDTO.getId());
            treponseService.save(treponseDTO);
        }
        tresultDTO.setResult(treponseService.calculResult(tresultDTO.getId()));
        tresultDTO = tresultService.save(tresultDTO);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tresultDTO));
     }
    /**
     * POST  /treponses : Create a new treponse.
     *
     * @param treponseDTO the treponseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new treponseDTO, or with status 400 (Bad Request) if the treponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/treponses")
    @Timed
    public ResponseEntity<TreponseDTO> createTreponse(@RequestBody TreponseDTO treponseDTO) throws URISyntaxException {
        log.debug("REST request to save Treponse : {}", treponseDTO);
        if (treponseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new treponse cannot already have an ID")).body(null);
        }
        TreponseDTO result = treponseService.save(treponseDTO);
        return ResponseEntity.created(new URI("/api/treponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /treponses : Updates an existing treponse.
     *
     * @param treponseDTO the treponseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated treponseDTO,
     * or with status 400 (Bad Request) if the treponseDTO is not valid,
     * or with status 500 (Internal Server Error) if the treponseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/treponses")
    @Timed
    public ResponseEntity<TreponseDTO> updateTreponse(@RequestBody TreponseDTO treponseDTO) throws URISyntaxException {
        log.debug("REST request to update Treponse : {}", treponseDTO);
        if (treponseDTO.getId() == null) {
            return createTreponse(treponseDTO);
        }
        TreponseDTO result = treponseService.save(treponseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, treponseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /treponses : get all the treponses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of treponses in body
     */
    @GetMapping("/treponses")
    @Timed
    public List<TreponseDTO> getAllTreponses() {
        log.debug("REST request to get all Treponses");
        return treponseService.findAll();
    }

    @GetMapping("/treponsesDetails/{id}")
        @Timed
        public List<Treponse> getAllTreponsesDetails(@PathVariable Long id) {
            log.debug("REST request to get all Treponses");
            return treponseService.findAllDetails(id);
        }

    /**
     * GET  /treponses/:id : get the "id" treponse.
     *
     * @param id the id of the treponseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the treponseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/treponses/{id}")
    @Timed
    public ResponseEntity<TreponseDTO> getTreponse(@PathVariable Long id) {
        log.debug("REST request to get Treponse : {}", id);
        TreponseDTO treponseDTO = treponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(treponseDTO));
    }

    /**
     * DELETE  /treponses/:id : delete the "id" treponse.
     *
     * @param id the id of the treponseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/treponses/{id}")
    @Timed
    public ResponseEntity<Void> deleteTreponse(@PathVariable Long id) {
        log.debug("REST request to delete Treponse : {}", id);
        treponseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
