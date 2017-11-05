package com.dima.jelearning.service.dto;


import javax.persistence.Lob;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Tquiz entity.
 */
public class TquizDTO implements Serializable {

    private Long id;

    private String descrip;

    private Integer nbre;

    @Lob
    private byte[] icone;
    private String iconeContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrip() {
        return descrip;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public Integer getNbre() {
        return nbre;
    }

    public void setNbre(Integer nbre) {
        this.nbre = nbre;
    }

    public byte[] getIcone() {
        return icone;
    }

    public void setIcone(byte[] icone) {
        this.icone = icone;
    }

    public String getIconeContentType() {
        return iconeContentType;
    }

    public void setIconeContentType(String iconeContentType) {
        this.iconeContentType = iconeContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TquizDTO tquizDTO = (TquizDTO) o;
        if(tquizDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tquizDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TquizDTO{" +
            "id=" + getId() +
            ", descrip='" + getDescrip() + "'" +
            ", nbre='" + getNbre() + "'" +
            ", icone='" + getIcone() + "'" +
            "}";
    }
}
